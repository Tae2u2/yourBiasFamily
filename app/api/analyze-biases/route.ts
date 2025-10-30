// app/api/analyze-biases/route.ts
// Next.js API Route for AI Analysis using Claude Haiku 3

import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Bias {
  name: string;
  reason: string;
  startDate: string;
  endDate: string;
}

export async function POST(request: NextRequest) {
  try {
    const { biases }: { biases: Bias[] } = await request.json();

    if (!biases || biases.length < 2) {
      return NextResponse.json(
        { error: '최애를 2명 이상 입력해주세요.' },
        { status: 400 }
      );
    }

    // Claude Haiku 3로 분석 (가장 저렴: $0.25 input, $1.25 output per M tokens)
    const message = await anthropic.messages.create({
      model: 'claude-haiku-3-20240307',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `다음 최애들의 공통점을 분석해주세요:

${biases.map((b, idx) => `
${idx + 1}. ${b.name}
   - 입덕 계기: ${b.reason}
   - 좋아했던 기간: ${b.startDate} ~ ${b.endDate}
`).join('\n')}

다음 형식의 JSON으로 응답해주세요:
{
  "commonalities": [공통점 3가지를 배열로],
  "familyCrest": "이 사람의 취향을 나타내는 가문 이름 (예: ⚜️ 淸純魅力家門 ⚜️)",
  "narrative": "족보 해설 (200자 이내, 중세 귀족 어투로 작성)"
}

중요: 반드시 JSON 형식으로만 응답하세요.`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    // JSON 파싱
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // 사용량 로깅 (비용 추적)
    const inputTokens = message.usage.input_tokens;
    const outputTokens = message.usage.output_tokens;
    const estimatedCost = (inputTokens * 0.25 / 1_000_000) + (outputTokens * 1.25 / 1_000_000);

    console.log(`
      🤖 AI Analysis Complete
      📊 Tokens: ${inputTokens} in, ${outputTokens} out
      💰 Cost: $${estimatedCost.toFixed(6)} (~${Math.round(estimatedCost * 1300)}원)
    `);

    return NextResponse.json({
      ...analysis,
      metadata: {
        inputTokens,
        outputTokens,
        estimatedCostUSD: estimatedCost,
        estimatedCostKRW: Math.round(estimatedCost * 1300),
      },
    });

  } catch (error) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json(
      { error: 'AI 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 비용 최적화 팁:
// 1. Prompt Caching 사용 시 90% 절감 가능
// 2. Batch API 사용 시 50% 절감 가능  
// 3. 여러 요청을 하나로 합치기 (batching)
// 4. 최대 토큰 수 제한으로 비용 통제

/* 
예상 비용 (Claude Haiku 3):
- Input: ~375 tokens × $0.25/M = $0.000094
- Output: ~650 tokens × $1.25/M = $0.000813
- Total: ~$0.001 (약 1.3원)

월 10,000건 처리 시:
- 총 비용: $10 (약 13,000원)
- 광고 수익으로 충분히 커버 가능!
*/

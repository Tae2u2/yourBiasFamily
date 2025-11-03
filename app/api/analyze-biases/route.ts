import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Idol {
  name: string;
  startDate: string;
  group: string;
}

export async function POST(request: NextRequest) {
  try {
    const { idols }: { idols: Idol[] } = await request.json();

    // 유효성 검사
    if (!idols || idols.length < 2) {
      return NextResponse.json(
        { error: "아이돌을 최소 2명 이상 입력해주세요." },
        { status: 400 }
      );
    }

    if (idols.length > 6) {
      return NextResponse.json(
        { error: "아이돌은 최대 6명까지 입력 가능합니다." },
        { status: 400 }
      );
    }

    // 프롬프트 생성: "스트레이키즈의 방찬과 엑스디너리 히어로즈의 구건일 방탄소년단의 정국"
    const idolList = idols
      .map((idol, idx) => {
        const separator =
          idx === idols.length - 1
            ? ""
            : idx === idols.length - 2
            ? "과 "
            : ", ";
        return `${idol.group}의 ${idol.name}${separator}`;
      })
      .join("");

    const prompt = `내가 좋아하는 아이돌은 ${idolList}이야. 나는 내가 왜 이 ${idols.length}명에게 매력을 느꼈는지 파악하고 싶어. ${idols.length}명의 공통점을 요약해서 4-5줄로 알려줘`;

    // Claude API 호출
    const message = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 500, // 4-5줄이면 충분
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // 사용량 로깅 (비용 추적)
    const inputTokens = message.usage.input_tokens;
    const outputTokens = message.usage.output_tokens;
    const estimatedCost =
      (inputTokens * 0.25) / 1_000_000 + (outputTokens * 1.25) / 1_000_000;

    console.log(`
      🤖 AI 분석 완료
      📊 토큰: ${inputTokens} 입력, ${outputTokens} 출력
      💰 비용: $${estimatedCost.toFixed(6)} (~${Math.round(
      estimatedCost * 1300
    )}원)
      👥 분석한 아이돌 수: ${idols.length}명
    `);

    return NextResponse.json({
      analysis: responseText,
      idols: idols.map((i) => ({ name: i.name, group: i.group })),
      metadata: {
        inputTokens,
        outputTokens,
        estimatedCostUSD: estimatedCost,
        estimatedCostKRW: Math.round(estimatedCost * 1300),
        idolCount: idols.length,
      },
    });
  } catch (error) {
    console.error("AI 분석 오류:", error);
    return NextResponse.json(
      { error: "AI 분석 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

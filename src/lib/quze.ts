import { CreateQuzePayload } from "@/types/quzeDataType";

export async function createQuze(token: string, data: CreateQuzePayload) {
  const durationToMinutes = (duration: string | undefined) => {
    if (!duration) return 0;
    const match = duration.match(/(\d+)h\s*(\d+)m/);
    if (!match) return 0;
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    return hours * 60 + minutes;
  };

  const today = new Date().toISOString().split("T")[0];

  const payload = {
    title: data?.basicInfo?.title,
    totalCandidates: Number(data?.basicInfo?.candidates),
    totalSlots: Number(data?.basicInfo?.slots),
    totalQuestionSet: 1,

    startTime: new Date(`${today}T${data?.basicInfo?.startTime}:00`),
    endTime: new Date(`${today}T${data?.basicInfo?.endTime}:00`),

    duration: durationToMinutes(data?.basicInfo?.duration),

    questions: data.questions1.map((q) => ({
      question: q.question,
      type: q.type,
      score: q.score,

      options:
        q.type !== "text"
          ? q.options.map((opt) => ({
              text: opt.text,
              isCorrect: opt.isCorrect,
            }))
          : [],

      textAnswer:
        q.type === "text"
          ? q.correctAnswer
          : undefined,
    })),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/quze/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const resData = await response.json();

  if (!response.ok) throw new Error(resData.message || "Failed to create quiz");

  return resData;
}


export async function updateQuze(token: string, data: CreateQuzePayload) {
  const durationToMinutes = (duration: string | undefined) => {
    if (!duration) return 0;
    const match = duration.match(/(\d+)h\s*(\d+)m/);
    if (!match) return 0;
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    return hours * 60 + minutes;
  };

  const today = new Date().toISOString().split("T")[0];

  const payload = {
    title: data?.basicInfo?.title,
    totalCandidates: Number(data?.basicInfo?.candidates),
    totalSlots: Number(data?.basicInfo?.slots),
    totalQuestionSet: 1,

    startTime: new Date(`${today}T${data?.basicInfo?.startTime}:00`),
    endTime: new Date(`${today}T${data?.basicInfo?.endTime}:00`),

    duration: durationToMinutes(data?.basicInfo?.duration),

    questions: data.questions1.map((q) => ({
      question: q.question,
      type: q.type,
      score: q.score,

      options:
        q.type !== "text"
          ? q.options.map((opt) => ({
              text: opt.text,
              isCorrect: opt.isCorrect,
            }))
          : [],

      textAnswer:
        q.type === "text"
          ? q.correctAnswer
          : undefined,
    })),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/quze/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const resData = await response.json();

  if (!response.ok) throw new Error(resData.message || "Failed to create quiz");

  return resData;
}


export async function getAllQuze() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quze/get`, {
    headers: {
    //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get quze");
  }
  return resData;
}


export async function getSingelQuze(id:string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quze/get/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get quze");
  }
  return resData;
}
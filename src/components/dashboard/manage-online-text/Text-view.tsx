import { EditorPlaceholder } from "./Editor-placeholder";

interface Props {
  correctAnswer: string;
  setCorrectAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export function TextView({ correctAnswer, setCorrectAnswer }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-600 mb-3">
          Correct Answer (Exact or Expected Answer)
        </p>
        <EditorPlaceholder
          label="Type the correct answer here..."
          value={correctAnswer}
          onChange={setCorrectAnswer}
        />
      </div>
    </div>
  );
}
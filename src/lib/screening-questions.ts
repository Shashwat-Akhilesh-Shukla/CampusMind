export type Question = {
  id: string;
  text: string;
};

export type Option = {
  text: string;
  value: number;
};

export const screeningOptions: Option[] = [
  { text: 'Not at all', value: 0 },
  { text: 'Several days', value: 1 },
  { text: 'More than half the days', value: 2 },
  { text: 'Nearly every day', value: 3 },
];

export const phq9Questions: Question[] = [
  { id: 'q1', text: 'Little interest or pleasure in doing things' },
  { id: 'q2', text: 'Feeling down, depressed, or hopeless' },
  { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much' },
  { id: 'q4', text: 'Feeling tired or having little energy' },
  { id: 'q5', text: 'Poor appetite or overeating' },
  { id: 'q6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down' },
  { id: 'q7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
  { id: 'q8', text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual' },
  { id: 'q9', text: 'Thoughts that you would be better off dead, or of hurting yourself' },
];

export const gad7Questions: Question[] = [
  { id: 'q1', text: 'Feeling nervous, anxious, or on edge' },
  { id: 'q2', text: 'Not being able to stop or control worrying' },
  { id: 'q3', text: 'Worrying too much about different things' },
  { id: 'q4', text: 'Trouble relaxing' },
  { id: 'q5', text: 'Being so restless that it is hard to sit still' },
  { id: 'q6', text: 'Becoming easily annoyed or irritable' },
  { id: 'q7', text: 'Feeling afraid as if something awful might happen' },
];

export const getPhq9Interpretation = (score: number): { level: string; recommendation: string } => {
  if (score <= 4) return { level: 'Minimal Depression', recommendation: 'Your score suggests you may have minimal or no symptoms of depression. Continue to monitor your mood.' };
  if (score <= 9) return { level: 'Mild Depression', recommendation: 'Your score suggests you may have mild symptoms of depression. Consider talking to someone you trust or exploring self-help resources.' };
  if (score <= 14) return { level: 'Moderate Depression', recommendation: 'Your score suggests you may have moderate symptoms of depression. It is recommended to speak with a doctor or mental health professional.' };
  if (score <= 19) return { level: 'Moderately Severe Depression', recommendation: 'Your score suggests you may have moderately severe symptoms of depression. Professional help from a doctor or mental health professional is strongly recommended.' };
  return { level: 'Severe Depression', recommendation: 'Your score suggests you may have severe symptoms of depression. It is very important to seek professional help immediately.' };
};

export const getGad7Interpretation = (score: number): { level: string; recommendation: string } => {
  if (score <= 4) return { level: 'Minimal Anxiety', recommendation: 'Your score suggests you may have minimal or no symptoms of anxiety. Continue to monitor your feelings.' };
  if (score <= 9) return { level: 'Mild Anxiety', recommendation: 'Your score suggests you may have mild symptoms of anxiety. Consider exploring relaxation techniques or talking to someone you trust.' };
  if (score <= 14) return { level: 'Moderate Anxiety', recommendation: 'Your score suggests you may have moderate symptoms of anxiety. Speaking with a doctor or mental health professional is recommended.' };
  return { level: 'Severe Anxiety', recommendation: 'Your score suggests you may have severe symptoms of anxiety. It is strongly recommended to seek professional help.' };
};

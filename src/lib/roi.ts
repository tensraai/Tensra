// ROI assumptions: 4 manual minutes per document, 90% automated, $65/hr loaded labour cost.
export const MINUTES_PER_DOC = 4;
export const AUTOMATION_RATE = 0.9;
export const HOURLY_COST = 65;

export function calcRoi(monthlyDocs: number) {
  const hours = Math.round((monthlyDocs * MINUTES_PER_DOC * AUTOMATION_RATE) / 60);
  const monthly = hours * HOURLY_COST;
  return { hours, monthly, annual: monthly * 12 };
}

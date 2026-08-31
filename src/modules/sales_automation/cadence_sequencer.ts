/**
 * Outbound Sales Cadence Sequencer & State Machine
 */

export interface CadenceStep {
  stepNumber: number;
  dayOffset: number;
  channel: 'Email' | 'Phone' | 'LinkedIn' | 'Task';
  templateSubject?: string;
  templateBody?: string;
}

export class CadenceSequencer {
  private defaultCadence: CadenceStep[] = [
    { stepNumber: 1, dayOffset: 1, channel: 'Email', templateSubject: 'Introductory Platform Architecture Demo', templateBody: 'Hi {{firstName}}, noticing your infrastructure expansion...' },
    { stepNumber: 2, dayOffset: 3, channel: 'Phone', templateBody: 'Follow-up call on initial email note.' },
    { stepNumber: 3, dayOffset: 7, channel: 'LinkedIn', templateBody: 'Connect and share recent Gartner Magic Quadrant report.' },
    { stepNumber: 4, dayOffset: 12, channel: 'Email', templateSubject: 'Customer Case Study: 40% TCO Reduction', templateBody: 'Hi {{firstName}}, thought you might find this tech breakdown relevant...' },
    { stepNumber: 5, dayOffset: 18, channel: 'Phone', templateBody: 'Final touchpoint before closing cadence sequence.' }
  ];

  public getNextAction(startDate: string, completedStep = 0): {
    nextStep?: CadenceStep;
    dueDate: string;
    isFinished: boolean;
  } {
    const nextStepNumber = completedStep + 1;
    const step = this.defaultCadence.find(s => s.stepNumber === nextStepNumber);

    if (!step) {
      return { isFinished: true, dueDate: new Date().toISOString() };
    }

    const start = new Date(startDate).getTime();
    const dueTime = start + (step.dayOffset * 86400000);

    return {
      nextStep: step,
      dueDate: new Date(dueTime).toISOString(),
      isFinished: false
    };
  }
}

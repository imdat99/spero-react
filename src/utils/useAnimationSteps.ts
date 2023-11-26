import { useMemo, useState } from "react";

interface AnimationStep {
  name: string;
  clickPosition: { x: number; y: number };
  time: number;
  moveDelay: number;
}

export default function useAnimationSteps<T extends AnimationStep>(
  animationSteps: readonly T[],
  debugStepName: T["name"] | "" = ""
) {
  const stepsOrder = animationSteps.reduce((acc, step, index) => {
    acc[step.name] = index;
    return acc;
  }, {} as Record<string, number>) as Record<T["name"], number>;

  const [stepName, setStepName] = useState<T["name"] | "">(debugStepName);

  const stepNumber = useMemo(() => {
    return animationSteps.findIndex((step) => step.name === stepName);
  }, [animationSteps, stepName]);

  const computedStep = useMemo(() => {
    return animationSteps[Math.max(0, stepNumber)];
  }, [animationSteps, stepNumber]);

  const [position, setPosition] = useState(
    debugStepName.length ? computedStep.clickPosition : { x: 2.7, y: 5.5 }
  );
  const moveTime = 1;

  function setMousePosition() {
    setPosition(computedStep.clickPosition);
  }

  let waitTimeout: ReturnType<typeof setTimeout>;

  async function wait(time: number) {
    clearTimeout(waitTimeout);
    return new Promise<void>((resolve) => {
      waitTimeout = setTimeout(() => {
        resolve();
      }, time);
    });
  }

  const [isClicking, setClick] = useState(false);
  let timeout: ReturnType<typeof setTimeout>;

  function click() {
    setClick(true);
    clearTimeout(timeout);
    return new Promise<void>((resolve) => {
      timeout = setTimeout(() => {
        setClick(false);
        resolve();
      }, 200);
    });
  }

  const play = async () => {
    if (debugStepName !== "") {
      return;
    }

    for (const step of animationSteps) {
      // Set Screenshot
      setStepName(step.name);

      await wait(step.moveDelay);
      setMousePosition();

      await wait(step.time);
      await click();
      await wait(200);
    }
  };

  return {
    play,
    position,
    moveTime,
    isClicking,
    stepNumber,
    stepName,
    stepsOrder,
  };
}

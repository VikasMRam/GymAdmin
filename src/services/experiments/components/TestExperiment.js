import { Experiment, Variant } from 'sly/services/experiments';
import React from 'react';

const TestExperiment = () => (
  <>
    <div>
      Herebe experiment
    </div>
    <Experiment name="test_exp">
      <Variant name="uno"><div>uno</div></Variant>
    <Variant name="dos"><div>dos</div></Variant>
    </Experiment>
  </>
);

TestExperiment.typeHydrationId = 'TestExperiment';

export default TestExperiment;

import React from 'react';
import css from './ExaminationView.module.css';
import { useSelector } from '../../store';
import {default as ExaminationOption, ExaminationOptionProps} from '../ExaminationOption/ExaminationOption';
import {BodyPart, Examination} from "../../store/state";

interface FindingProps {
  result: string;
  method: string;
  bodyPart: BodyPart;
  timeDone: number;
};

interface ExaminationViewProps {
    selectedBodyPart: BodyPart;
    optionProps: ExaminationOptionProps[];
    findings: FindingProps[];
};

const Finding: React.FC<FindingProps> = (props) => {
  return (
    <div className={css.Finding}>
      <h3 className={css.Finding__Result}>
        {props.result}
      </h3>
      <div className={css.Finding__Metadata}>
        {props.method} ({props.bodyPart})
      </div>
    </div>
  )
}

// Shows the examination options and findings
const ExaminationViewRaw: React.FC<ExaminationViewProps> = (props) => {
    return (
        <div className={css.ExaminationView}>
            <div className={css.Header}>{props.selectedBodyPart} - Examinations</div>
            <div className={css.ExaminationOptionList}>
                {props.optionProps.map((p, i) => (
                  <div key={i} className={css.ExaminationOptionWrapper}>
                    <ExaminationOption {...p} />
                  </div>
                ))}
            </div>
            <div className={css.Header}>Findings</div>
            <div className={css.Findings}>
                {props.findings.map((f, i) => <Finding key={i} {...f} />)}
            </div>
        </div>
    )
}

const ExaminationView: React.FC = () => {
    const selectedBodyPart = useSelector(state => state.body);
    const examinationsOptions = useSelector(state => state.examinations);
    const completedExaminations = useSelector(state => state.completedExaminations);

    const findings = Object.keys(completedExaminations).flatMap((bodyPart: string) => {
      const methods = completedExaminations[bodyPart as BodyPart];
      return methods.flatMap(([m, timeDone]) => {
        return examinationsOptions[bodyPart as BodyPart][m].results.flatMap((observation) => {
          return {
            result: observation.text,
            method: m,
            bodyPart: bodyPart as BodyPart,
            timeDone
          }
        });
      });
    });

    // Sort by time done, newest at the top
    findings.sort((a, b) => b.timeDone - a.timeDone);

    const optionProps = Object.keys(examinationsOptions[selectedBodyPart]).map(method => ({
        text: method,
        disabled: completedExaminations[selectedBodyPart].map(([m, t]) => m).indexOf(method) !== -1 || undefined,
        method: method,
        cost: examinationsOptions[selectedBodyPart][method].cost,
    }));
    return <ExaminationViewRaw selectedBodyPart={selectedBodyPart} optionProps={optionProps} findings={findings}></ExaminationViewRaw>
}

export default ExaminationView;

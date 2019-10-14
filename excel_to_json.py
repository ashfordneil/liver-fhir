import json
import sys

import pandas as pd


def generate_bundle():
    return dict(
        resourceType="Bundle",
        type="collection",
        entry=[],
        id="cf-1569511612518",  # TODO - generate?
    )


def generate_observation(row: dict) -> dict:
    finding_text = row['Finding Desc']
    return dict(
        resource=dict(
            resourceType="Observation",
            text=dict(
                status="generated",
                div=f"<div xmlns='http://www.w3.org/1999/xhtml'>{finding_text}</div>"
            ),
            id="TODO",
            subject=dict(
                reference="Patient/blah"
            ),
            status="registered",
            code=dict(
                coding=dict(
                    code=str(int(row['Finding'])),
                    system="http://snomed.info/sct",
                    display=finding_text
                )
            ),
            bodySite=dict(
                coding=dict(
                    code=str(int(row['BodyRegion'])),
                    system="http://snomed.info/sct",
                    display=row['BR Description']
                )
            ),
            method=dict(
                coding=dict(
                    code=str(int(row['QualifierValue'])),
                    system="http://snomed.info/sct",
                    display=row['QV Description']
                )
            ),
        )
    )

def convert_df_to_json(df: pd.DataFrame) -> str:
    bundle = generate_bundle()
    for row in df.to_dict('records'):
        bundle['entry'].append(generate_observation(row))
    
    return bundle

if __name__ == "__main__":
    df = pd.read_excel(sys.argv[1], sys.argv[2])
    df = df.dropna(how='any', axis=0)
    print(df)
    json_text = json.dumps(convert_df_to_json(df), indent=4)
    with open('out.json', 'w') as f:
        f.write(json_text)
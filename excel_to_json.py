"""
Takes an excel file and returns a JSON you can send to the FHIR server
1. Create a patient, this uses id=270
2. Clear previous observations: DELETE https://uat.csiro.au/fhirServer/fhir/Observation?subject=270
3. Send new observations: POST https://uat.csiro.au/fhirServer/fhir/ (body is the contents of out.json)
"""
import json
import sys
import random
import string

import pandas as pd


EXAMPLE_SHEET = "Example Patient"
NAD_SHEET = "NAD Patient"


def random_id():
    return 'pe-' + ''.join(random.choice(string.ascii_lowercase) for i in range(10))

def generate_bundle():
    return dict(
        resourceType="Bundle",
        type="batch",
        entry=[],
        id=random_id(),
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
            id=random_id(),
            subject=dict(
                reference="Patient/270"
            ),
            status="registered",
            code=dict(
                coding=[dict(
                    code=str(int(row['Finding'])),
                    system="http://snomed.info/sct",
                    display=finding_text
                )]
            ),
            bodySite=dict(
                coding=[dict(
                    code=str(int(row['BodyRegion'])),
                    system="http://snomed.info/sct",
                    display=row['BR Description']
                )]
            ),
            method=dict(
                coding=[dict(
                    code=str(int(row['QualifierValue'])),
                    system="http://snomed.info/sct",
                    display=row['QV Description']
                )]
            )
        ),
        request=dict(
            method='POST'
        )
    )


def convert_df_to_json(df: pd.DataFrame) -> str:
    bundle = generate_bundle()
    for row in df.to_dict('records'):
        bundle['entry'].append(generate_observation(row))
    
    return bundle


def combine_dfs(nad_df, example_df) -> pd.DataFrame:
    example_values = example_df[['BodyRegion', 'QualifierValue']].drop_duplicates().apply(tuple, axis=1)
    other_nad_df = nad_df[~nad_df[['BodyRegion', 'QualifierValue']].apply(tuple, axis=1).isin(example_values)]
    return pd.concat([example_df, other_nad_df], axis=0)

if __name__ == "__main__":
    nad_df = pd.read_excel(sys.argv[1], NAD_SHEET)
    nad_df = nad_df.dropna(how='any', axis=0)
    example_df = pd.read_excel(sys.argv[1], EXAMPLE_SHEET)
    example_df = example_df.dropna(how='any', axis=0)
    df = combine_dfs(nad_df, example_df)
    json_text = json.dumps(convert_df_to_json(df), indent=4)
    with open('out.json', 'w') as f:
        f.write(json_text)
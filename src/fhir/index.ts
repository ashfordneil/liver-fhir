import blah from './hardcoded.json';
import {BodyPart, Examination, ExaminationId} from "../store/state";

const bodyPartCodeLookup: {[key: string]: BodyPart} = {
    "181261002": "Pelvis",  // Actually rectum
    "181469002": "Arms",  // It is "skin" but that's too broad
    "258335003": "Head",  // Actually brain
    "243928005": "Entire Body",  // Actually whole body
    "181608004": "Chest",
    "302553009": "Abdomen"
};

// figure out how long an examination takes, looking up snomed codes in a small
// hardcoded database
const getTime = (examination: any): number | undefined => {
  const methodCode = examination.resource.method.coding[0].code;
  switch (methodCode) {
    case "37931006": // auscultation
      return 60;
    case "32750006": // visual examination
    case "311886005": // visual perception
    case "271906008": // examination finding (this is bad coding we should fix it)
      return 30;
    case "410188000": // taking patient vital signs assessment
      return 120;
    case "84728005": // neurological examination
    case "410006001": // digital rectal examination
      console.warn("Snomed METHOD code that did not have an associated time value: ", methodCode);
      return undefined;
    default:
      throw new Error(`${methodCode} unrecognised snomed code`);
  }
}

// Get examinations from fhir
export const getExaminations = async () => {
    const entriesWithBody = blah.entry.filter(
        (e) => e.resource.bodySite && bodyPartCodeLookup[e.resource.bodySite.coding[0].code] && e.resource.method && e.resource.code
    );
    // To reach the deadline we will group bodypart / method combos under the same ID
    const hackLookup: {[key in BodyPart]: {[key: string]: ExaminationId}} = {
        Head: {},
        Eyes: {},
        Nose: {},
        Chest: {},
        Abdomen: {},
        Arms: {},
        Hands: {},
        Pelvis: {},
        Legs: {},
        Feet: {},
        "Entire Body": {},
    };
    const examinations: {[key in ExaminationId]: Examination[]} = {};
    const examinationOptions: {[key in BodyPart]: ExaminationId[]} = {
        Head: [],
        Eyes: [],
        Nose: [],
        Chest: [],
        Abdomen: [],
        Arms: [],
        Hands: [],
        Pelvis: [],
        Legs: [],
        Feet: [],
        "Entire Body": []
    };
    entriesWithBody.forEach((e) => {
        const method = e.resource.method!.coding[0].display;
        const bodyPart = bodyPartCodeLookup[e.resource.bodySite!.coding[0].code];
        if (hackLookup[bodyPart][method] == null) {
            hackLookup[bodyPart][method] = e.resource.id;
            examinations[e.resource.id] = [];
            examinationOptions[bodyPart].push(e.resource.id);
        }

        const id = hackLookup[bodyPart][method];
        examinations[id].push({
              name: e.resource.method!.coding[0].display,
              result: {
                  text: e.resource.code!.coding[0].display,
              },
              cost: {
                  money: 0,
                  time: getTime(e) || 60
              },
              bodyPart,
              method,
        });
    });

  return {examinations, examinationOptions};
};

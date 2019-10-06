import blah from './hardcoded.json';
import {BodyPart, Examination, ExaminationId} from "../store/state";

const bodyPartCodeLookup: {[key: string]: BodyPart} = {
    "181261002": "Pelvis",  // Actually rectum
    "181469002": "Arms",  // It is "skin" but that's too broad
    "258335003": "Head",  // Actually brain
    "243928005": "Chest",  // Actually whole body
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
    const examinations: {[key in ExaminationId]: Examination} = {};
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
        Feet: []
    };
    entriesWithBody.forEach((e) => {
        const id = e.resource.id;
        const bodyPart = bodyPartCodeLookup[e.resource.bodySite!.coding[0].code];
        examinations[id] = {
            name: e.resource.method!.coding[0].display,
            result: {
                text: e.resource.code!.coding[0].display
            },
            cost: {
                money: 0,
              // TODO - ensure that we don't have unknown method times
                time: getTime(e) || 60,
            }
        };
        examinationOptions[bodyPart].push(id);
    });

    return {examinations, examinationOptions};
};

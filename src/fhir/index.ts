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
                // TODO - have them in data
                money: 10,
                time: 60
            }
        };
        examinationOptions[bodyPart].push(id);
    });

    return {examinations, examinationOptions};
};

import {
  create,
  findOneByFormId,
  findAll,
  remove,
  editAll,
} from "../services/levelCheckService.js";

function StrengthAndWeakness(level_name, score, strength = [], weakness = []) {
  this.level_name = level_name;
  this.score = score;
  this.strength = strength;
  this.weakness = weakness;
}

function LevelCheckEntry(
  id,
  dateCreated,
  student_name,
  feedback,
  bookRecommendation,
  overallCEFR,
  speaking,
  confidence,
  grammar,
  vocabulary,
  listening,
  pronunciation
) {
  this.id = id;
  this.dateCreated = dateCreated;
  this.student_name = student_name;
  this.feedback = feedback;
  this.bookRecommendation = bookRecommendation;
  this.overallCEFR = overallCEFR;
  this.speaking = speaking;
  this.confidence = confidence;
  this.grammar = grammar;
  this.vocabulary = vocabulary;
  this.listening = listening;
  this.pronunciation = pronunciation;
}

const toNum = (v) => (v === "" || v == null ? undefined : Number(v));

const manageData = (data) => {
  const list = Array.isArray(data.strengthsWeaknesses)
    ? data.strengthsWeaknesses
    : [];

  const pick = (category, type) =>
    list
      .filter((i) => i.category === category && i.type === type)
      .map((i) => i.description);

  const mkSW = (level_name, score, category) =>
    new StrengthAndWeakness(
      level_name ?? "",
      toNum(score),
      pick(category, "strength"),
      pick(category, "weakness")
    );

  return new LevelCheckEntry(
    data.id,
    data.createdAt,
    data.name,
    data.feedback,
    data.bookRecommendation,
    data.overallCEFR,
    mkSW(data.speakingNameEntry, data.speakingScore, "speaking"),
    mkSW(data.confidenceNameEntry, data.confidenceScore, "confidence"),
    mkSW(data.grammarNameEntry, data.grammarScore, "grammar"),
    mkSW(data.vocabularyNameEntry, data.vocabularyScore, "vocabulary"),
    mkSW(data.listeningNameEntry, data.listeningScore, "listening"),
    mkSW(data.pronunciationNameEntry, data.pronunciationScore, "pronunciation")
  );
};

export const createLevelCheckForm = async (req, res) => {
  try {
    const result = await create(req, res);
    console.log(result);
    res.send({ status: true, message: "It worked!", data: result });
  } catch (error) {
    return res.status(500).json({ error: "Couldn't create form" });
  }
};

export const getLevelCheckReport = async (req, res) => {
  try {
    const rawData = await findOneByFormId(req, res);
    const data = manageData(rawData);
    return res.status(200).json({ message: "Went through", data });
  } catch (error) {
    return res.status(500).json({ error: "Error in the backend" });
  }
};

export const updateAllDataLevelcheckFormByFormID = async (req, res) => {
  try {
    const rawData = await editAll(req, res);
    const data = manageData(rawData);
    return res.send({ status: true, message: "Uploaded", data });
  } catch (error) {
    return res.status(500).json({ error: "Error in the backend" });
  }
};

export const deleteLevelCheckByFormID = async (req, res) => {
  try {
    const result = await remove(req, res);
    return res.send({ data: result });
  } catch (error) {
    return res.status(500).json({ error: "Error in the backend" });
  }
};

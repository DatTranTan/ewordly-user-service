// Define the Article DTO
interface WordDTO {
  id: string;
  word: string;
  meaning: string;
  phonetic: string;
  audio: string;
  image: string;
  type: string;
  exampleEn: string;
  exampleVi: string;
}

export default WordDTO;

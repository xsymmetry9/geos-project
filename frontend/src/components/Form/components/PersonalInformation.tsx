import labelText from "../../../assets/other/labelText.json";

interface InputData {
  name: string;
  course: string;
  textbook: string;
  attendance: number;
  totalLessons: number;
}

interface InputError {
  name?: boolean;
  course?: boolean;
  textbook?: boolean;
  attendance?: boolean;
  totalLessons: boolean;
}

type Language = keyof typeof labelText;

interface PersonalInformationProps {
  inputData: InputData;
  inputError: InputError;
  handleInputData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  language: Language;
}
const PersonalInformation: React.FC<PersonalInformationProps> = ({
  inputData,
  inputError,
  handleInputData,
  language,
}) => {
  const { name, course, textbook, attendance, totalLessons } = inputData;

  //translation
  const { input_name, input_course, input_textbook, input_attendance, input_totallessons } =
    labelText[language].form;

  return (
    <div className="pb-[3rem]" id="personal-information">
      <h2 className="bg-[#00646c] p-2 text-center text-xl font-bold text-white capitalize">
        {labelText[language].SPR["student_information"]}
      </h2>
      <div className="m-auto mt-8">
        <div className="grid grid-cols-1 gap-6">
          <label className="block" htmlFor="name">
            <span className="text-gray-700 capitalize">{input_name}</span>
            <input
              type="text"
              className="form-input font-primary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
              name="name"
              value={name}
              onChange={handleInputData}
            />
            {inputError.name && <p className="text-sm text-red-600">Missing text</p>}
          </label>
          <label className="block" htmlFor="course">
            <span className="text-gray-700 capitalize">{input_course}</span>
            <select
              className="font-primary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
              id="course"
              name="course"
              value={course}
              onChange={handleInputData}
            >
              <option className="font-secondary text-base text-inherit" value="">
                Select course
              </option>
              <option className="font-secondary text-base text-inherit" value="ONLINE">
                ONLINE
              </option>
              <option className="font-secondary text-base text-inherit" value="PL">
                PL
              </option>
              <option className="font-secondary text-base text-inherit" value="2PL">
                2PL
              </option>
              <option className="font-secondary text-base text-inherit" value="FLEX">
                FLEX
              </option>
              <option className="font-secondary text-base text-inherit" value="SGL">
                SGL
              </option>
              <option className="font-secondary text-base text-inherit" value="GL">
                GL
              </option>
              <option className="font-secondary text-base text-inherit" value="Company">
                Company
              </option>
            </select>
            {inputError.course && <p className="text-sm text-red-600">Missing course</p>}
          </label>
          <label className="block" htmlFor="textbook">
            <span className="text-gray-700 capitalize">{input_textbook}</span>
            <input
              className="form-input font-primary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
              type="text"
              name="textbook"
              value={textbook}
              onChange={handleInputData}
            />
            {inputError.textbook && <p className="text-sm text-red-600">Missing textbook</p>}
          </label>
          <label className="block" htmlFor="attendance">
            <span className="text-gray-700 capitalize">{input_attendance}</span>
            <input
              className="form-input font-primary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
              type="number"
              name="attendance"
              id="attendance"
              value={attendance}
              min={0}
              onChange={handleInputData}
            />
            {inputError.attendance && (
              <p className="text-sm text-red-600">Needs to be greater than 0 and a whole number</p>
            )}
          </label>
          <label className="block" htmlFor="totalLessons">
            <span className="text-gray-700 capitalize">{input_totallessons}</span>
            <input
              className="form-input font-primary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
              type="number"
              name="totalLessons"
              id="totalLessons"
              min={0}
              value={totalLessons}
              onChange={handleInputData}
            />
            {inputError.totalLessons && (
              <p className="text-sm text-red-600">
                Needs to be greater than 0 and greater than attended lessons
              </p>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;

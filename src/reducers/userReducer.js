import {
  ADD_CHAPTER,
  REMOVE_CHAPTER,
  REMOVE_LESSON,
  ADD_LESSON,
  ADD_TEXTBOOK
} from "../actions/types";

const initialState = {
  chapters: [
    // {
    //   slug: "officia-atque-consequatur-rerum-voluptatibus-ut",
    //   number: 1,
    //   title: "Officia atque consequatur rerum voluptatibus ut.",
    //   uuid: "asdfasdasd",
    //   lessons: [
    //     {
    //       slug: "temat-3-jest-jaki-jest",
    //       title: "Temat 3 jest jaki jest",
    //       uuid: "asdasd"
    //     },
    //     {
    //       slug: "temat-1-taki-sobie-3",
    //       title: "Temat 1 taki sobie",
    //       uuid: "asdassd"
    //     },
    //     {
    //       slug: "temat-2-taki-sobie",
    //       title: "Temat 2 taki sobie",
    //       uuid: "asdadsasd"
    //     },
    //     {
    //       slug: "temat-2-taki-sobie-2",
    //       title: "Temat 2 taki sobie",
    //       uuid: "asfasdasd"
    //     },
    //     {
    //       slug: "temat-3-jest-jaki-jest-15",
    //       title: "Temat 3 jest jaki jest",
    //       uuid: "asdaasfsfasd"
    //     },
    //     {
    //       slug: "temat-1-taki-sobie-15",
    //       title: "Temat 1 taki sobie",
    //       uuid: "aafssafsdasd"
    //     },
    //     {
    //       slug: "temat-3-jest-jaki-jest-22",
    //       title: "Temat 3 jest jaki jest",
    //       uuid: "asasdasddasd"
    //     },
    //     {
    //       slug: "temat-1-taki-sobie-27",
    //       title: "Temat 1 taki sobie",
    //       uuid: "asdaasdasdsd"
    //     }
    //   ]
    // },
    // {
    //   slug: "officia-atque-consequatur-rerum-voluptatibus-ut",
    //   number: 1,
    //   title: "Drugi",
    //   uuid: "afbjnand2nn",
    //   lessons: [
    //     {
    //       slug: "temat-3-jest-jaki-jest",
    //       title: "Temat 3 jest jaki jest",
    //       uuid: "asda222sd"
    //     },
    //     {
    //       slug: "temat-1-taki-sobie-3",
    //       title: "Temat 1 taki sobie",
    //       uuid: "asda333sd"
    //     },
    //     {
    //       slug: "temat-2-taki-sobie",
    //       title: "Temat 2 taki sobie",
    //       uuid: "asd55asd"
    //     }
    //   ]
    // }
  ],
  sendStatus: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CHAPTER:
      return {
        ...state,
        chapters: [...state.chapters, action.payload]
      };
    case REMOVE_CHAPTER:
      return {
        ...state,
        chapters: state.chapters.filter(chapter =>
          chapter.uuid === action.payload ? null : chapter
        )
      };
    case REMOVE_LESSON:
      return {
        ...state,
        chapters: state.chapters.map(chapter => {
          let newChapter = chapter;
          if (
            chapter.hasOwnProperty("lessons") &&
            Array.isArray(chapter.lessons) &&
            chapter.lessons.length
          ) {
            newChapter = {
              ...chapter,
              lessons: chapter.lessons.filter(lesson =>
                lesson.uuid === action.payload ? null : lesson
              )
            };
          }
          return newChapter;
        })
      };
    case ADD_LESSON: {
      let lastChapter = state.chapters[state.chapters.length - 1];
      return {
        ...state,
        chapters: state.chapters.map(chapter => {
          if (chapter.uuid === lastChapter.uuid)
            return {
              ...chapter,
              lessons: [...chapter.lessons, action.payload]
            };
          return chapter;
        })
      };
    }
    case ADD_TEXTBOOK:
      return {
        ...state,
        chapters: [],
        sendStatus: action.payload
      };

    default:
      return state;
  }
}

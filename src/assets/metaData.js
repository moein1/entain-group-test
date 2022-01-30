/**
 * list of the fields that we should show in the
 * race grid
 */
export const RACE_DATA_FIELD_LIST = [
  {
    id: "meeting_name",
    fieldref: "meeting_name",
    label: "Metting Name",
  },
  {
    id: "race_number",
    fieldref: "race_number",
    label: "Race Number",
  },
  {
    id: "countDown",
    fieldref: "countDown",
    label: "Count Down",
    filter: true,
    startedClass: "blinker",
  },
];

/**api url for getting the list of the races */
export const GET_RACE_LIST_API =
  "https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10";

/**list of the category that
 * we need to use in the select
 */
export const RACING_CATEGORY_LIST = [
  {
    id: "9daef0d7-bf3c-4f50-921d-8e818c60fe61",
    text: "Greyhound racing",
  },
  {
    id: "161d9be2-e909-4326-8c2c-35ed71fb460b",
    text: "Harness racing",
  },
  {
    id: "4a2788f8-e825-4d36-9894-efd4baf1cfae",
    text: "Horse racing",
  },
];

/**Max number of race to be shown in the grid */
export const RACE_COUNT_TO_SHOW = 5;

/**text to be shown in the count down column after starting */
export const COUNT_DOWN_TEXT_START = "Started";

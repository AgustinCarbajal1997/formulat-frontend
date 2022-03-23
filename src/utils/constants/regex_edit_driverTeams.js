const ONLY_LETTERS =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const pilotos = {
  name: ONLY_LETTERS,
  image: /^/,
  team: ONLY_LETTERS,
  carNumber: /^/,
  country: ONLY_LETTERS,
  nationality: ONLY_LETTERS,
  wins: /^/,
  birthDate:/^/,
  championships: /^/,
};

const equipos = {
  name: ONLY_LETTERS,
  image: /^/,
  firstDriver: ONLY_LETTERS,
  secondDriver: ONLY_LETTERS,
  country: ONLY_LETTERS,
  nationality: ONLY_LETTERS,
  wins: /^/,
  championships: /^/,
  teamPrincipal: ONLY_LETTERS,
};
const REGULAR_EXPRESSION = { pilotos, equipos };
export default REGULAR_EXPRESSION;

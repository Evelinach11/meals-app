import { stepState } from "../../utilis/steps-util";

export const categoriesForBaseRecipe = [
  { name: "Перші страви" },
  { name: "Салати" },
  { name: "Гарніри" },
  { name: "Риба" },
  { name: "М'ясні страви" },
  { name: "Десерти" },
  { name: "Напої" },
  { name: "Соуси та заправки" },
];

export const borch = {
  title: "Борщ",
  category: "Перші страви",
  time: 60,
  photo: require("../../img/borch.png"),
  isSystem: true,
  ingredients: [
    { name: "Вода", count: 2, typeOfCount: "л" },
    {
      name: "Cвинина",
      count: 400,
      typeOfCount: "г",
      calories: 160,
    },
    { name: "Картопля", count: 400, typeOfCount: "г", calories: 85 },
    { name: "Буряк", count: 200, typeOfCount: "г", calories: 45 },
    { name: "Морква", count: 200, typeOfCount: "г", calories: 35 },
    { name: "Цибуля", count: 200, typeOfCount: "г", calories: 43 },
    {
      name: "Капуста білокачанна свіжа",
      count: 300,
      typeOfCount: "г",
      calories: 67,
    },
    { name: "Томатна паста", count: 30, typeOfCount: "г", calories: 30 },
    {
      name: "Соняшникова олія",
      count: 60,
      typeOfCount: "г",
      calories: 31,
    },
    { name: "Лимонна кислота", count: 20, typeOfCount: "г" },
    { name: "Сіль", count: 5, typeOfCount: "г" },
    { name: "Лавровий лист", count: 10, typeOfCount: "г", calories: 374 },
    { name: "Зелень", count: 100, typeOfCount: "г", calories: 56 },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Підготовка всіх необхідних інгредієнтів для борщу.",
      time: 10,
      orderliness: 1,
      state: stepState.wait,
    },
    {
      title: "Нарізання овочів",
      description:
        "Нарізати свинину або яловичину, картоплю, буряк, моркву, цибулю та капусту.",
      time: 10,
      orderliness: 2,
      state: stepState.wait,
    },
    {
      title: "Приготування смаженої цибулі",
      description:
        "Обсмажте цибулю на соняшниковій олії до золотистої скоринки.",
      time: 5,
      orderliness: 3,
      state: stepState.wait,
    },
    {
      title: "Додавання м'яса",
      description:
        "Додайте нарізану свинину або яловичину до обсмаженої цибулі і смажте разом протягом 5 хвилин.",
      time: 5,
      orderliness: 4,
      state: stepState.wait,
    },
    {
      title: "Додавання овочів",
      description:
        "Додайте нарізану картоплю, буряк, моркву та капусту до м'яса і цибулі.",
      time: 5,
      orderliness: 5,
      state: stepState.wait,
    },
    {
      title: "Додавання томатної пасти",
      description:
        "Додайте томатну пасту та лимонну кислоту до інших інгредієнтів.",
      time: 3,
      orderliness: 6,
      state: stepState.wait,
    },
    {
      title: "Додавання води та варіння",
      description:
        "Долити воду, додати сіль і лавровий лист. Довести до кипіння і варити на помірному вогні протягом 20-25 хвилин.",
      time: 20,
      orderliness: 7,
      state: stepState.wait,
    },
    {
      title: "Подача і подача",
      description: "Подати гарячий борщ зі свіжою зеленню.",
      time: 2,
      orderliness: 8,
      state: stepState.wait,
    },
  ],
};

export const ceasarSalad = {
  title: "Салат Цезар",
  category: "Салати",
  time: 40,
  photo: require("../../img/ceasar-salad.jpg"),
  isSystem: true,
  ingredients: [
    { name: "Салат Айсберг", count: 300, typeOfCount: "г", calories: 14 },
    { name: "Куряче філе", count: 300, typeOfCount: "г", calories: 151 },
    { name: "Хліб тостовий", count: 300, typeOfCount: "г", calories: 267 },
    { name: "Пармезан", count: 100, typeOfCount: "г", calories: 389 },
    { name: "Соус Цезар", count: 60, typeOfCount: "г", calories: 260 },
    { name: "Оливкова олія", count: 30, typeOfCount: "г", calories: 896 },
    { name: "Часник", count: 2, typeOfCount: "зубчики", calories: 130 },
    { name: "Сіль", count: 5, typeOfCount: "г" },
    { name: "Перець", count: 5, typeOfCount: "г", calories: 251 },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Підготовка всіх необхідних інгредієнтів для салату Цезар.",
      time: 10,
      orderliness: 1,
      state: stepState.wait,
    },
    {
      title: "Приготування курячого філе",
      description:
        "Приготувати куряче філе, обсмаживши його на оливковій олії до золотистої скоринки.",
      time: 10,
      orderliness: 2,
      state: stepState.wait,
    },
    {
      title: "Приготування грільованого хліба",
      description:
        "Підсмажити тостовий хліб на рештках або у духовці до золотистого кольору.",
      time: 5,
      orderliness: 3,
      state: stepState.wait,
    },
    {
      title: "Приготування соусу Цезар",
      description:
        "Приготувати соус Цезар, змішавши його із майонезом, тостовим хлібом, тертим пармезаном, пресованим часником, сіллю та перцем.",
      time: 5,
      orderliness: 4,
      state: stepState.wait,
    },
    {
      title: "Складання салату",
      description:
        "Скласти салат Цезар, положивши листя салату, нарізане куряче філе та грільований хліб у глибоку миску. Заправити соусом Цезар.",
      time: 5,
      orderliness: 5,
      state: stepState.wait,
    },
    {
      title: "Подача",
      description:
        "Подати салат Цезар, прикрасивши його крутонами та тертим пармезаном.",
      time: 5,
      orderliness: 6,
      state: stepState.wait,
    },
  ],
};

export const guacamole = {
  title: "Гуакамоле",
  category: "Салати",
  time: 25,
  photo: require("../../img/guacomole.jpg"),
  isSystem: true,
  ingredients: [
    { name: "Авокадо", count: 200, typeOfCount: "г", calories: 251 },
    { name: "Цибуля червона", count: 100, typeOfCount: "г", calories: 40 },
    { name: "Помідор", count: 100, typeOfCount: "г", calories: 20 },
    { name: "Лайм", count: 100, typeOfCount: "г", calories: 37 },
    { name: "Солодкий перець", count: 1, typeOfCount: "г", calories: 35 },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Чилі порошок", count: 0.5, typeOfCount: "ч. л", calories: 45 },
    { name: "Коріандр молотий", count: 0.5, typeOfCount: "ч. л" },
    { name: "Часник", count: 2, typeOfCount: "зубчики", calories: 130 },
  ],
  steps: [
    {
      title: "Приготування інгредієнтів",
      description: "Підготуйте всі необхідні інгредієнти.",
      time: 5,
      orderliness: 1,
    },
    {
      title: "Приготування маси з авокадо",
      description:
        "Розіжте авокадо та вийміть м'якоть. Розмішайте її виделкою.",
      time: 5,
      orderliness: 2,
    },
    {
      title: "Підготовка інших овочів",
      description: "Наріжте помідор, цибулю та солодкий перець.",
      time: 5,
      orderliness: 3,
    },
    {
      title: "Змішування інгредієнтів",
      description:
        "Помістіть усі нарізані овочі разом з авокадо в миску. Додайте сіль, чилі порошок та коріандр. Ретельно змішайте.",
      time: 5,
      orderliness: 4,
    },
    {
      title: "Подача",
      description:
        "Подайте гуакамоле за бажанням з тортилья чіпсами або свіжими овочами.",
      time: 5,
      orderliness: 5,
    },
  ],
};

export const greekSalad = {
  title: "Салат Грецький",
  category: "Салати",
  time: 25,
  isSystem: true,
  ingredients: [
    { name: "Помідори", count: 200, typeOfCount: "г", calories: 20 },
    { name: "Огірки", count: 150, typeOfCount: "г", calories: 16 },
    { name: "Сир фета", count: 200, typeOfCount: "г", calories: 220 },
    { name: "Чорні оливки", count: 100, typeOfCount: "г", calories: 111 },
    { name: "Цибуля червона", count: 100, typeOfCount: "г", calories: 40 },
    { name: "Оливкова олія", count: 2, typeOfCount: "ст. л", calories: 867 },
    { name: "Оцет винний", count: 2, typeOfCount: "ст. л" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 1, typeOfCount: "ч. л" },
  ],
  steps: [
    {
      title: "Приготування інгредієнтів",
      description: "Підготуйте всі необхідні інгредієнти.",
      time: 5,
      orderliness: 1,
    },
    {
      title: "Нарізання овочів",
      description: "Наріжте помідори, огірки та цибулю на смачні кубики.",
      time: 5,
      orderliness: 2,
    },
    {
      title: "Приготування сир фета",
      description: "Наріжте сир фета на маленькі кубики.",
      time: 5,
      orderliness: 3,
    },
    {
      title: "Приготування масла для заправки",
      description:
        "Змішайте оливкову олію та оцет винний в мисці для заправки.",
      time: 2,
      orderliness: 4,
    },
    {
      title: "Змішування інгредієнтів",
      description:
        "Помістіть нарізані помідори, огірки, сир фета та чорні оливки в велику миску. Додайте нарізану цибулю. Залийте масло для заправки та посоліть та поперчіть за смаком. Ретельно змішайте всі інгредієнти.",
      time: 3,
      orderliness: 5,
    },
    {
      title: "Подача",
      description: "Подайте салат Грецький на столі. Смачного!",
      time: 5,
      orderliness: 6,
    },
  ],
};

export const mushroomSoup = {
  title: "Грибний крем-суп",
  category: "Перші страви",
  time: 55,
  photo: require("../../img/mush-soup.jpg"),
  isSystem: true,
  ingredients: [
    { name: "Шампіньйони", count: 300, typeOfCount: "г", calories: 56 },
    { name: "Цибуля", count: 100, typeOfCount: "г", calories: 56 },
    { name: "Картопля", count: 200, typeOfCount: "г", calories: 56 },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 0.5, typeOfCount: "ч. л" },
    { name: "Сливки", count: 200, typeOfCount: "мл", calories: 56 },
    { name: "Масло вершкове", count: 2, typeOfCount: "ст. л", calories: 56 },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Приготуйте всі необхідні інгредієнти.",
      time: 10,
      orderliness: 1,
    },
    {
      title: "Приготування овочів",
      description:
        "Наріжте шампіньйони, цибулю та картоплю на дрібні шматочки.",
      time: 10,
      orderliness: 2,
    },
    {
      title: "Обсмаження овочів",
      description:
        "Розігрійте масло вершкове у каструлі. Обсмажте цибулю декілька хвилин до золотистості.",
      time: 5,
      orderliness: 3,
    },
    {
      title: "Готування супу",
      description:
        "Додайте нарізані шампіньйони та картоплю. Смажте 5 хвилин. Приправте сіллю та перцем. Додайте сливки та готуйте ще 20-25 хвилин до м'якості овочів.",
      time: 25,
      orderliness: 4,
    },
    {
      title: "Подача",
      description:
        "Подайте грибний крем-суп гарячим. Прикрасьте за бажанням зеленню.",
      time: 5,
      orderliness: 5,
    },
  ],
};

export const olivierSalad = {
  title: "Салат Олів'є",
  category: "Салати",
  time: 50,
  isSystem: true,
  ingredients: [
    { name: "Картопля", count: 300, typeOfCount: "г", calories: 56 },
    { name: "Морква", count: 200, typeOfCount: "г", calories: 56 },
    { name: "Яйця", count: 400, typeOfCount: "г", calories: 56 },
    { name: "Ковбаса варена", count: 200, typeOfCount: "г", calories: 56 },
    {
      name: "Горошок консервований",
      count: 100,
      typeOfCount: "г",
      calories: 56,
    },
    { name: "Майонез", count: 4, typeOfCount: "ст. л", calories: 56 },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 1, typeOfCount: "ч. л" },
  ],
  steps: [
    {
      title: "Приготування інгредієнтів",
      description: "Підготуйте всі необхідні інгредієнти.",
      time: 10,
      orderliness: 1,
    },
    {
      title: "Готування картоплі і моркви",
      description:
        "Сваріть картоплю та моркву до готовності. Охолодіть, обіть та наріжте на кубики.",
      time: 15,
      orderliness: 2,
    },
    {
      title: "Приготування яєць",
      description:
        "Сваріть яйця до готовності, охолодіть, обіть та наріжте на кубики.",
      time: 10,
      orderliness: 3,
    },
    {
      title: "Приготування інших інгредієнтів",
      description:
        "Наріжте ковбасу варену на кубики. Вимийте горошок консервований.",
      time: 5,
      orderliness: 4,
    },
    {
      title: "Змішування інгредієнтів",
      description:
        "Помістіть нарізані картоплю, моркву, яйця, ковбасу варену та горошок консервований в велику миску. Додайте майонез, сіль та перець за смаком. Ретельно змішайте всі інгредієнти.",
      time: 5,
      orderliness: 5,
    },
    {
      title: "Подача",
      description: "Подайте салат Олів'є на столі. Смачного!",
      time: 5,
      orderliness: 6,
    },
  ],
};

export const peasantSoup = {
  title: "Селянський суп",
  category: "Перші страви",
  time: 60,
  photo: require("../../img/peasant-soup.jpg"),
  isSystem: true,
  ingredients: [
    { name: "Картопля", count: 300, typeOfCount: "г", calories: 56 },
    { name: "Буряк", count: 200, typeOfCount: "г", calories: 56 },
    { name: "Морква", count: 150, typeOfCount: "г", calories: 56 },
    { name: "Цибуля", count: 100, typeOfCount: "г", calories: 56 },
    { name: "Капуста", count: 200, typeOfCount: "г", calories: 56 },
    { name: "Часник", count: 2, typeOfCount: "зубчики", calories: 56 },
    { name: "Сметана", count: 2, typeOfCount: "ст. л", calories: 56 },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 0.5, typeOfCount: "ч. л" },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Приготуйте всі необхідні інгредієнти.",
      time: 5,
      orderliness: 1,
    },
    {
      title: "Приготування овочів",
      description:
        "Очистіть та наріжте картоплю, буряк, моркву, цибулю та капусту.",
      time: 10,
      orderliness: 2,
    },
    {
      title: "Обсмаження овочів",
      description:
        "Розігрійте масло у каструлі. Обсмажте цибулю та часник декілька хвилин до золотистості.",
      time: 5,
      orderliness: 3,
    },
    {
      title: "Готування супу",
      description:
        "Додайте нарізані овочі у каструлю з обсмаженою цибулею та часником. Приправте сіллю та перцем. Готуйте 30-35 хвилин або доки овочі не стануть м'якими.",
      time: 35,
      orderliness: 4,
    },
    {
      title: "Подача",
      description:
        "Подайте селянський суп гарячим з додаванням сметани за смаком. Прикрасьте зеленню за бажанням.",
      time: 5,
      orderliness: 5,
    },
  ],
};

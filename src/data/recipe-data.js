import { stepState } from "../../utilis/steps-util";

export const borch = {
  title: "Борщ",
  category: "Перші страви",
  time: "60хв",
  photo: require("../../img/borch.png"),
  ingredients: [
    { name: "Вода", count: 2, typeOfCount: "л" },
    {
      name: "Cвинина або яловичина",
      count: 400,
      typeOfCount: "г",
    },
    { name: "Картопля", count: 4, typeOfCount: "шт" },
    { name: "Буряк", count: 2, typeOfCount: "шт" },
    { name: "Морква", count: 2, typeOfCount: "шт" },
    { name: "Цибуля", count: 3, typeOfCount: "шт" },
    {
      name: "Капуста білокачанна свіжа",
      count: 300,
      typeOfCount: "г",
    },
    { name: "Томатна паста", count: 2, typeOfCount: "ст. л" },
    { name: "Соняшникова олія", count: 4, typeOfCount: "ст. л" },
    { name: "Лимонна кислота", count: 4, typeOfCount: "ч. л" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Лавровий лист", count: 1, typeOfCount: "шт" },
    { name: "Зелень", count: 100, typeOfCount: "г" },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Підготовка всіх необхідних інгредієнтів для борщу.",
      time: "15 хвилин",
      orderliness: 1,
      state: stepState.wait,
    },
    {
      title: "Нарізання овочів",
      description:
        "Нарізати свинину або яловичину, картоплю, буряк, моркву, цибулю та капусту.",
      time: "10 хвилин",
      orderliness: 2,
      state: stepState.wait,
    },
    {
      title: "Приготування смаженої цибулі",
      description:
        "Обсмажте цибулю на соняшниковій олії до золотистої скоринки.",
      time: "5 хвилин",
      orderliness: 3,
      state: stepState.wait,
    },
    {
      title: "Додавання м'яса",
      description:
        "Додайте нарізану свинину або яловичину до обсмаженої цибулі і смажте разом протягом 5 хвилин.",
      time: "5 хвилин",
      orderliness: 4,
      state: stepState.wait,
    },
    {
      title: "Додавання овочів",
      description:
        "Додайте нарізану картоплю, буряк, моркву та капусту до м'яса і цибулі.",
      time: "5 хвилин",
      orderliness: 5,
      state: stepState.wait,
    },
    {
      title: "Додавання томатної пасти",
      description:
        "Додайте томатну пасту та лимонну кислоту до інших інгредієнтів.",
      time: "2 хвилини",
      orderliness: 6,
      state: stepState.wait,
    },
    {
      title: "Додавання води та варіння",
      description:
        "Долити воду, додати сіль і лавровий лист. Довести до кипіння і варити на помірному вогні протягом 20-25 хвилин.",
      time: "25 хвилин",
      orderliness: 7,
      state: stepState.wait,
    },
    {
      title: "Подача і подача",
      description: "Подати гарячий борщ зі свіжою зеленню.",
      time: "5 хвилин",
      orderliness: 8,
      state: stepState.wait,
    },
  ],
};

export const ceasarSalad = {
  title: "Салат Цезар",
  category: "Салати",
  time: "30хв",
  photo: require("../../img/ceasar-salad.jpg"),
  ingredients: [
    { name: "Салат Айсберг", count: 1, typeOfCount: "шт" },
    { name: "Куряче філе", count: 300, typeOfCount: "г" },
    { name: "Хліб тостовий", count: 4, typeOfCount: "шт" },
    { name: "Пармезан", count: 100, typeOfCount: "г" },
    { name: "Соус Цезар", count: 4, typeOfCount: "ст. л" },
    { name: "Оливкова олія", count: 2, typeOfCount: "ст. л" },
    { name: "Часник", count: 2, typeOfCount: "зубчики" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 1, typeOfCount: "ч. л" },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Підготовка всіх необхідних інгредієнтів для салату Цезар.",
      time: "10 хвилин",
      orderliness: 1,
      state: stepState.wait,
    },
    {
      title: "Приготування курячого філе",
      description:
        "Приготувати куряче філе, обсмаживши його на оливковій олії до золотистої скоринки.",
      time: "10 хвилин",
      orderliness: 2,
      state: stepState.wait,
    },
    {
      title: "Приготування грільованого хліба",
      description:
        "Підсмажити тостовий хліб на рештках або у духовці до золотистого кольору.",
      time: "5 хвилин",
      orderliness: 3,
      state: stepState.wait,
    },
    {
      title: "Приготування соусу Цезар",
      description:
        "Приготувати соус Цезар, змішавши його із майонезом, тостовим хлібом, тертим пармезаном, пресованим часником, сіллю та перцем.",
      time: "5 хвилин",
      orderliness: 4,
      state: stepState.wait,
    },
    {
      title: "Складання салату",
      description:
        "Скласти салат Цезар, положивши листя салату, нарізане куряче філе та грільований хліб у глибоку миску. Заправити соусом Цезар.",
      time: "5 хвилин",
      orderliness: 5,
      state: stepState.wait,
    },
    {
      title: "Подача",
      description:
        "Подати салат Цезар, прикрасивши його крутонами та тертим пармезаном.",
      time: "5 хвилин",
      orderliness: 6,
      state: stepState.wait,
    },
  ],
};

export const guacamole = {
  title: "Гуакамоле",
  category: "Салати",
  time: "15хв",
  ingredients: [
    { name: "Авокадо", count: 2, typeOfCount: "шт" },
    { name: "Цибуля червона", count: 1, typeOfCount: "шт" },
    { name: "Помідор", count: 1, typeOfCount: "шт" },
    { name: "Лайм", count: 1, typeOfCount: "шт" },
    { name: "Солодкий перець", count: 1, typeOfCount: "шт" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Чилі порошок", count: 0.5, typeOfCount: "ч. л" },
    { name: "Коріандр молотий", count: 0.5, typeOfCount: "ч. л" },
    { name: "Часник", count: 2, typeOfCount: "зубчики" },
  ],
  steps: [
    {
      title: "Приготування інгредієнтів",
      description: "Підготуйте всі необхідні інгредієнти.",
      time: "5 хвилин",
      orderliness: 1,
    },
    {
      title: "Приготування маси з авокадо",
      description:
        "Розіжте авокадо та вийміть м'якоть. Розмішайте її виделкою.",
      time: "5 хвилин",
      orderliness: 2,
    },
    {
      title: "Підготовка інших овочів",
      description: "Наріжте помідор, цибулю та солодкий перець.",
      time: "5 хвилин",
      orderliness: 3,
    },
    {
      title: "Змішування інгредієнтів",
      description:
        "Помістіть усі нарізані овочі разом з авокадо в миску. Додайте сіль, чилі порошок та коріандр. Ретельно змішайте.",
      time: "5 хвилин",
      orderliness: 4,
    },
    {
      title: "Подача",
      description:
        "Подайте гуакамоле за бажанням з тортилья чіпсами або свіжими овочами.",
      time: "5 хвилин",
      orderliness: 5,
    },
  ],
};

export const greekSalad = {
  title: "Салат Грецький",
  category: "Салати",
  time: "20хв",
  ingredients: [
    { name: "Помідори", count: 3, typeOfCount: "шт" },
    { name: "Огірки", count: 2, typeOfCount: "шт" },
    { name: "Сир фета", count: 200, typeOfCount: "г" },
    { name: "Чорні оливки", count: 100, typeOfCount: "г" },
    { name: "Цибуля червона", count: 1, typeOfCount: "шт" },
    { name: "Оливкова олія", count: 2, typeOfCount: "ст. л" },
    { name: "Оцет винний", count: 2, typeOfCount: "ст. л" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 1, typeOfCount: "ч. л" },
  ],
};

export const mushroomSoup = {
  title: "Грибний крем-суп",
  category: "Перші страви",
  time: "40хв",
  photo: require("../../img/mush-soup.jpg"),
  ingredients: [
    { name: "Шампіньйони", count: 300, typeOfCount: "г" },
    { name: "Цибуля", count: 1, typeOfCount: "шт" },
    { name: "Картопля", count: 2, typeOfCount: "шт" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 0.5, typeOfCount: "ч. л" },
    { name: "Сливки", count: 200, typeOfCount: "мл" },
    { name: "Масло вершкове", count: 2, typeOfCount: "ст. л" },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Приготуйте всі необхідні інгредієнти.",
      time: "10 хвилин",
      orderliness: 1,
    },
    {
      title: "Приготування овочів",
      description:
        "Наріжте шампіньйони, цибулю та картоплю на дрібні шматочки.",
      time: "10 хвилин",
      orderliness: 2,
    },
    {
      title: "Обсмаження овочів",
      description:
        "Розігрійте масло вершкове у каструлі. Обсмажте цибулю декілька хвилин до золотистості.",
      time: "5 хвилин",
      orderliness: 3,
    },
    {
      title: "Готування супу",
      description:
        "Додайте нарізані шампіньйони та картоплю. Смажте 5 хвилин. Приправте сіллю та перцем. Додайте сливки та готуйте ще 20-25 хвилин до м'якості овочів.",
      time: "25 хвилин",
      orderliness: 4,
    },
    {
      title: "Подача",
      description:
        "Подайте грибний крем-суп гарячим. Прикрасьте за бажанням зеленню.",
      time: "5 хвилин",
      orderliness: 5,
    },
  ],
};

export const olivierSalad = {
  title: "Салат Олів'є",
  category: "Салати",
  time: "45хв",
  ingredients: [
    { name: "Картопля", count: 3, typeOfCount: "шт" },
    { name: "Морква", count: 2, typeOfCount: "шт" },
    { name: "Яйця", count: 4, typeOfCount: "шт" },
    { name: "Ковбаса варена", count: 200, typeOfCount: "г" },
    { name: "Горошок консервований", count: 100, typeOfCount: "г" },
    { name: "Майонез", count: 4, typeOfCount: "ст. л" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 1, typeOfCount: "ч. л" },
  ],
};

export const peasantSoup = {
  title: "Селянський суп",
  category: "Перші страви",
  time: "60 хвилин",
  photo: require("../../img/peasant-soup.jpg"),
  ingredients: [
    { name: "Картопля", count: 3, typeOfCount: "шт" },
    { name: "Буряк", count: 2, typeOfCount: "шт" },
    { name: "Морква", count: 2, typeOfCount: "шт" },
    { name: "Цибуля", count: 1, typeOfCount: "шт" },
    { name: "Капуста", count: 200, typeOfCount: "г" },
    { name: "Часник", count: 2, typeOfCount: "зубчики" },
    { name: "Сметана", count: 2, typeOfCount: "ст. л" },
    { name: "Сіль", count: 1, typeOfCount: "ч. л" },
    { name: "Перець", count: 0.5, typeOfCount: "ч. л" },
  ],
  steps: [
    {
      title: "Підготовка інгредієнтів",
      description: "Приготуйте всі необхідні інгредієнти.",
      time: "10 хвилин",
      orderliness: 1,
    },
    {
      title: "Приготування овочів",
      description:
        "Очистіть та наріжте картоплю, буряк, моркву, цибулю та капусту.",
      time: "15 хвилин",
      orderliness: 2,
    },
    {
      title: "Обсмаження овочів",
      description:
        "Розігрійте масло у каструлі. Обсмажте цибулю та часник декілька хвилин до золотистості.",
      time: "5 хвилин",
      orderliness: 3,
    },
    {
      title: "Готування супу",
      description:
        "Додайте нарізані овочі у каструлю з обсмаженою цибулею та часником. Приправте сіллю та перцем. Готуйте 30-35 хвилин або доки овочі не стануть м'якими.",
      time: "35 хвилин",
      orderliness: 4,
    },
    {
      title: "Подача",
      description:
        "Подайте селянський суп гарячим з додаванням сметани за смаком. Прикрасьте зеленню за бажанням.",
      time: "5 хвилин",
      orderliness: 5,
    },
  ],
};

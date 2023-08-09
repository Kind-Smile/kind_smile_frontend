export default {
  isAuthenticated: false,
  token: "",
  benefactorUsers: [],
  charityUsers: [],

  verificatedPhoneNumber: "",

  benefactor: {
    isClickAddress: false,
    isSetAddress: false,
    address: "",
    latitude: 0.0,
    longitude: 0.0,
  },
  charity: {
    isClickAddress: false,
    isSetAddress: false,
    isSetPolygon: false,
    address: "",
    polygonPoints: {},
    latitude: 0.0,
    longitude: 0.0,
  },

  states: [
    {
      name: "آذربايجان شرقی",
      latitude: "38.054825",
      longitude: "46.300327",
      id: 1,
    },
    {
      name: "آذربايجان غربی",
      latitude: "37.320",
      longitude: "45.40",
      id: 2,
    },
    {
      name: "اردبيل",
      latitude: "38.140",
      longitude: "48.170",
      id: 3,
    },
    {
      name: "اصفهان",
      latitude: "32.390",
      longitude: "51.400",
      id: 4,
    },
    {
      name: "ايلام",
      latitude: "33.380",
      longitude: "46.250",
      id: 5,
    },
    {
      name: "بوشهر",
      latitude: "28.590",
      longitude: "50.500",
      id: 6,
    },
    {
      name: "تهران",
      latitude: "35.410",
      longitude: "51.240",
      id: 7,
    },
    {
      name: "چهارمحال بختیاری",
      latitude: "32.190",
      longitude: "50.510",
      id: 8,
    },
    {
      name: "خراسان جنوبی",
      latitude: "32.5216",
      longitude: "59.1315",
      id: 9,
    },
    {
      name: "خراسان رضوی",
      latitude: "36.170",
      longitude: "59.350",
      id: 10,
    },
    {
      name: "خراسان شمالی",
      latitude: "37.2835",
      longitude: "57.1954",
      id: 11,
    },
    {
      name: "خوزستان",
      latitude: "31.190",
      longitude: "48.410",
      id: 12,
    },
    {
      name: "زنجان",
      latitude: "36.400",
      longitude: "48.290",
      id: 13,
    },
    {
      name: "سمنان",
      latitude: "35.340",
      longitude: "53.230",
      id: 14,
    },
    {
      name: "سيستان و بلوچستان",
      latitude: "29.320",
      longitude: "60.540",
      id: 15,
    },
    {
      name: "فارس",
      latitude: "29.360",
      longitude: "52.310",
      id: 16,
    },
    {
      name: "قزوين",
      latitude: "36.167",
      longitude: "50.010",
      id: 17,
    },
    {
      name: "قم",
      latitude: "34.380",
      longitude: "50.530",
      id: 18,
    },
    {
      name: "البرز",
      latitude: "35.8400",
      longitude: "50.9391",
      id: 19,
    },
    {
      name: "كردستان",
      latitude: "35.180",
      longitude: "47.10",
      id: 20,
    },
    {
      name: "کرمان",
      latitude: "30.160",
      longitude: "57.40",
      id: 21,
    },
    {
      name: "كرمانشاه",
      latitude: "34.180",
      longitude: "47.30",
      id: 22,
    },
    {
      name: "كهكيلويه و بويراحمد",
      latitude: "30.390",
      longitude: "51.350",
      id: 23,
    },
    {
      name: "گلستان",
      latitude: "36.500",
      longitude: "54.250",
      id: 24,
    },
    {
      name: "گيلان",
      latitude: "37.160",
      longitude: "49.350",
      id: 25,
    },
    {
      name: "لرستان",
      latitude: "33.290",
      longitude: "48.210",
      id: 26,
    },
    {
      name: "مازندران",
      latitude: "36.330",
      longitude: "53.30",
      id: 27,
    },
    {
      name: "مرکزی",
      latitude: "34.50",
      longitude: "49.410",
      id: 28,
    },
    {
      name: "هرمزگان",
      latitude: "56.266",
      longitude: "27.18",
      id: 29,
    },
    {
      name: "همدان",
      latitude: "34.470",
      longitude: "48.300",
      id: 30,
    },
    {
      name: "يزد",
      latitude: "31.530",
      longitude: "54.210",
      id: 31,
    },
  ],

  charityList: [
    {
      id: 1,
      charityName: "کانون خدمت رضوي حب‌الائمه (ع)",
      collectionTime: "چهارشنبه ساعت ۱۲:۰۰",
      foodRequired: "۵۰",
      foodRequiredLeft: "۱۴",
    },
    {
      id: 2,
      charityName: "کانون خدمت دوم",
      collectionTime: "سه‌شنبه ساعت ۱۲:۰۰",
      foodRequired: "۵۰",
      foodRequiredLeft: "۱۴",
    },
    {
      id: 3,
      charityName: "کانون خدمت سوم",
      collectionTime: "چهارشنبه ساعت ۱۲:۰۰",
      foodRequired: "۵۰",
      foodRequiredLeft: "۱۴",
    },
    {
      id: 4,
      charityName: "کانون خدمت چهارم",
      collectionTime: "چهارشنبه ساعت ۱۲:۰۰",
      foodRequired: "۵۰",
      foodRequiredLeft: "۱۴",
    },
    {
      id: 5,
      charityName: "کانون خدمت پنجم",
      collectionTime: "چهارشنبه ساعت ۱۲:۰۰",
      foodRequired: "۵۰",
      foodRequiredLeft: "۱۴",
    },
  ],
};

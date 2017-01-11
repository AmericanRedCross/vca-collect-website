var settings = {}

settings.app = {
  defaultpass: '123',
  defaultuser: 'me',
	port: 3000,
	db: 'site.db',
  s3bucket: 'ifrc-vca'
  //Amazon S3 Credentials are stored in ~/.aws/credentials (see: http://aws.amazon.com/sdk-for-node-js/)
}

settings.website = {

}

settings.countries = [
  {
    "code": "AD",
    "EN": "Andorra",
    "FR": "Andorre"
  },
  {
    "code": "AE",
    "EN": "United Arab Emirates",
    "FR": "Émirats arabes unis"
  },
  {
    "code": "AF",
    "EN": "Afghanistan",
    "FR": "Afghanistan"
  },
  {
    "code": "AG",
    "EN": "Antigua and Barbuda",
    "FR": "Antigua-et-Barbuda"
  },
  {
    "code": "AI",
    "EN": "Anguilla",
    "FR": "Anguilla"
  },
  {
    "code": "AL",
    "EN": "Albania",
    "FR": "Albanie"
  },
  {
    "code": "AM",
    "EN": "Armenia",
    "FR": "Arménie"
  },
  {
    "code": "AO",
    "EN": "Angola",
    "FR": "Angola"
  },
  {
    "code": "AQ",
    "EN": "Antarctica",
    "FR": "Antarctique"
  },
  {
    "code": "AR",
    "EN": "Argentina",
    "FR": "Argentine"
  },
  {
    "code": "AS",
    "EN": "American Samoa",
    "FR": "Samoa américaine"
  },
  {
    "code": "AT",
    "EN": "Austria",
    "FR": "Autriche"
  },
  {
    "code": "AU",
    "EN": "Australia",
    "FR": "Australie"
  },
  {
    "code": "AW",
    "EN": "Aruba",
    "FR": "Aruba"
  },
  {
    "code": "AX",
    "EN": "Åland Islands",
    "FR": "Îles d'Åland"
  },
  {
    "code": "AZ",
    "EN": "Azerbaijan",
    "FR": "Azerbaïdjan"
  },
  {
    "code": "BA",
    "EN": "Bosnia and Herzegovina",
    "FR": "Bosnie-Herzégovine"
  },
  {
    "code": "BB",
    "EN": "Barbados",
    "FR": "Barbade"
  },
  {
    "code": "BD",
    "EN": "Bangladesh",
    "FR": "Bangladesh"
  },
  {
    "code": "BE",
    "EN": "Belgium",
    "FR": "Belgique"
  },
  {
    "code": "BF",
    "EN": "Burkina Faso",
    "FR": "Burkina Faso"
  },
  {
    "code": "BG",
    "EN": "Bulgaria",
    "FR": "Bulgarie"
  },
  {
    "code": "BH",
    "EN": "Bahrain",
    "FR": "Bahreïn"
  },
  {
    "code": "BI",
    "EN": "Burundi",
    "FR": "Burundi"
  },
  {
    "code": "BJ",
    "EN": "Benin",
    "FR": "Bénin"
  },
  {
    "code": "BL",
    "EN": "Saint Barthélemy",
    "FR": "Saint-Barthélemy"
  },
  {
    "code": "BM",
    "EN": "Bermuda",
    "FR": "Bermudes"
  },
  {
    "code": "BN",
    "EN": "Brunei Darussalam",
    "FR": "Brunei Darussalam"
  },
  {
    "code": "BO",
    "EN": "Bolivia",
    "FR": "Bolivie"
  },
  {
    "code": "BQ",
    "EN": "Caribbean Netherlands",
    "FR": "Pays-Bas caribéens"
  },
  {
    "code": "BR",
    "EN": "Brazil",
    "FR": "Brésil"
  },
  {
    "code": "BS",
    "EN": "Bahamas",
    "FR": "Bahamas"
  },
  {
    "code": "BT",
    "EN": "Bhutan",
    "FR": "Bhoutan"
  },
  {
    "code": "BV",
    "EN": "Bouvet Island",
    "FR": "Île Bouvet"
  },
  {
    "code": "BW",
    "EN": "Botswana",
    "FR": "Botswana"
  },
  {
    "code": "BY",
    "EN": "Belarus",
    "FR": "Bélarus"
  },
  {
    "code": "BZ",
    "EN": "Belize",
    "FR": "Belize"
  },
  {
    "code": "CA",
    "EN": "Canada",
    "FR": "Canada"
  },
  {
    "code": "CC",
    "EN": "Cocos (Keeling) Islands",
    "FR": "Îles Cocos (Keeling)"
  },
  {
    "code": "CD",
    "EN": "Congo, Democratic Republic of",
    "FR": "Congo, République démocratique du"
  },
  {
    "code": "CF",
    "EN": "Central African Republic",
    "FR": "République centrafricaine"
  },
  {
    "code": "CG",
    "EN": "Congo",
    "FR": "Congo"
  },
  {
    "code": "CH",
    "EN": "Switzerland",
    "FR": "Suisse"
  },
  {
    "code": "CI",
    "EN": "Côte d'Ivoire",
    "FR": "Côte d'Ivoire"
  },
  {
    "code": "CK",
    "EN": "Cook Islands",
    "FR": "Îles Cook"
  },
  {
    "code": "CL",
    "EN": "Chile",
    "FR": "Chili"
  },
  {
    "code": "CM",
    "EN": "Cameroon",
    "FR": "Cameroun"
  },
  {
    "code": "CN",
    "EN": "China",
    "FR": "Chine"
  },
  {
    "code": "CO",
    "EN": "Colombia",
    "FR": "Colombie"
  },
  {
    "code": "CR",
    "EN": "Costa Rica",
    "FR": "Costa Rica"
  },
  {
    "code": "CU",
    "EN": "Cuba",
    "FR": "Cuba"
  },
  {
    "code": "CV",
    "EN": "Cape Verde",
    "FR": "Cap-Vert"
  },
  {
    "code": "CW",
    "EN": "Curaçao",
    "FR": "Curaçao"
  },
  {
    "code": "CX",
    "EN": "Christmas Island",
    "FR": "Île Christmas"
  },
  {
    "code": "CY",
    "EN": "Cyprus",
    "FR": "Chypre"
  },
  {
    "code": "CZ",
    "EN": "Czech Republic",
    "FR": "République tchèque"
  },
  {
    "code": "DE",
    "EN": "Germany",
    "FR": "Allemagne"
  },
  {
    "code": "DJ",
    "EN": "Djibouti",
    "FR": "Djibouti"
  },
  {
    "code": "DK",
    "EN": "Denmark",
    "FR": "Danemark"
  },
  {
    "code": "DM",
    "EN": "Dominica",
    "FR": "Dominique"
  },
  {
    "code": "DO",
    "EN": "Dominican Republic",
    "FR": "République dominicaine"
  },
  {
    "code": "DZ",
    "EN": "Algeria",
    "FR": "Algérie"
  },
  {
    "code": "EC",
    "EN": "Ecuador",
    "FR": "Équateur"
  },
  {
    "code": "EE",
    "EN": "Estonia",
    "FR": "Estonie"
  },
  {
    "code": "EG",
    "EN": "Egypt",
    "FR": "Égypte"
  },
  {
    "code": "EH",
    "EN": "Western Sahara",
    "FR": "Sahara Occidental"
  },
  {
    "code": "ER",
    "EN": "Eritrea",
    "FR": "Érythrée"
  },
  {
    "code": "ES",
    "EN": "Spain",
    "FR": "Espagne"
  },
  {
    "code": "ET",
    "EN": "Ethiopia",
    "FR": "Éthiopie"
  },
  {
    "code": "FI",
    "EN": "Finland",
    "FR": "Finlande"
  },
  {
    "code": "FJ",
    "EN": "Fiji",
    "FR": "Fidji"
  },
  {
    "code": "FK",
    "EN": "Falkland Islands",
    "FR": "Îles Malouines"
  },
  {
    "code": "FM",
    "EN": "Micronesia, Federated States of",
    "FR": "Micronésie, États fédérés de"
  },
  {
    "code": "FO",
    "EN": "Faroe Islands",
    "FR": "Îles Féroé"
  },
  {
    "code": "FR",
    "EN": "France",
    "FR": "France"
  },
  {
    "code": "GA",
    "EN": "Gabon",
    "FR": "Gabon"
  },
  {
    "code": "GB",
    "EN": "United Kingdom",
    "FR": "Royaume-Uni"
  },
  {
    "code": "GD",
    "EN": "Grenada",
    "FR": "Grenade"
  },
  {
    "code": "GE",
    "EN": "Georgia",
    "FR": "Géorgie"
  },
  {
    "code": "GF",
    "EN": "French Guiana",
    "FR": "Guyane française"
  },
  {
    "code": "GG",
    "EN": "Guernsey",
    "FR": "Guernesey"
  },
  {
    "code": "GH",
    "EN": "Ghana",
    "FR": "Ghana"
  },
  {
    "code": "GI",
    "EN": "Gibraltar",
    "FR": "Gibraltar"
  },
  {
    "code": "GL",
    "EN": "Greenland",
    "FR": "Groenland"
  },
  {
    "code": "GM",
    "EN": "Gambia",
    "FR": "Gambie"
  },
  {
    "code": "GN",
    "EN": "Guinea",
    "FR": "Guinée"
  },
  {
    "code": "GP",
    "EN": "Guadeloupe",
    "FR": "Guadeloupe"
  },
  {
    "code": "GQ",
    "EN": "Equatorial Guinea",
    "FR": "Guinée équatoriale"
  },
  {
    "code": "GR",
    "EN": "Greece",
    "FR": "Grèce"
  },
  {
    "code": "GS",
    "EN": "South Georgia and the South Sandwich Islands",
    "FR": "Géorgie du Sud et les îles Sandwich du Sud"
  },
  {
    "code": "GT",
    "EN": "Guatemala",
    "FR": "Guatemala"
  },
  {
    "code": "GU",
    "EN": "Guam",
    "FR": "Guam"
  },
  {
    "code": "GW",
    "EN": "Guinea-Bissau",
    "FR": "Guinée-Bissau"
  },
  {
    "code": "GY",
    "EN": "Guyana",
    "FR": "Guyana"
  },
  {
    "code": "HK",
    "EN": "Hong Kong",
    "FR": "Hong Kong"
  },
  {
    "code": "HM",
    "EN": "Heard and McDonald Islands",
    "FR": "Îles Heard et McDonald"
  },
  {
    "code": "HN",
    "EN": "Honduras",
    "FR": "Honduras"
  },
  {
    "code": "HR",
    "EN": "Croatia",
    "FR": "Croatie"
  },
  {
    "code": "HT",
    "EN": "Haiti",
    "FR": "Haïti"
  },
  {
    "code": "HU",
    "EN": "Hungary",
    "FR": "Hongrie"
  },
  {
    "code": "ID",
    "EN": "Indonesia",
    "FR": "Indonésie"
  },
  {
    "code": "IE",
    "EN": "Ireland",
    "FR": "Irlande"
  },
  {
    "code": "IL",
    "EN": "Israel",
    "FR": "Israël"
  },
  {
    "code": "IM",
    "EN": "Isle of Man",
    "FR": "Île de Man"
  },
  {
    "code": "IN",
    "EN": "India",
    "FR": "Inde"
  },
  {
    "code": "IO",
    "EN": "British Indian Ocean Territory",
    "FR": "Territoire britannique de l'océan Indien"
  },
  {
    "code": "IQ",
    "EN": "Iraq",
    "FR": "Irak"
  },
  {
    "code": "IR",
    "EN": "Iran",
    "FR": "Iran"
  },
  {
    "code": "IS",
    "EN": "Iceland",
    "FR": "Islande"
  },
  {
    "code": "IT",
    "EN": "Italy",
    "FR": "Italie"
  },
  {
    "code": "JE",
    "EN": "Jersey",
    "FR": "Jersey"
  },
  {
    "code": "JM",
    "EN": "Jamaica",
    "FR": "Jamaïque"
  },
  {
    "code": "JO",
    "EN": "Jordan",
    "FR": "Jordanie"
  },
  {
    "code": "JP",
    "EN": "Japan",
    "FR": "Japon"
  },
  {
    "code": "KE",
    "EN": "Kenya",
    "FR": "Kenya"
  },
  {
    "code": "KG",
    "EN": "Kyrgyzstan",
    "FR": "Kirghizistan"
  },
  {
    "code": "KH",
    "EN": "Cambodia",
    "FR": "Cambodge"
  },
  {
    "code": "KI",
    "EN": "Kiribati",
    "FR": "Kiribati"
  },
  {
    "code": "KM",
    "EN": "Comoros",
    "FR": "Comores"
  },
  {
    "code": "KN",
    "EN": "Saint Kitts and Nevis",
    "FR": "Saint-Kitts-et-Nevis"
  },
  {
    "code": "KP",
    "EN": "North Korea",
    "FR": "Corée du Nord"
  },
  {
    "code": "KR",
    "EN": "South Korea",
    "FR": "Corée du Sud"
  },
  {
    "code": "KW",
    "EN": "Kuwait",
    "FR": "Koweït"
  },
  {
    "code": "KY",
    "EN": "Cayman Islands",
    "FR": "Îles Caïmans"
  },
  {
    "code": "KZ",
    "EN": "Kazakhstan",
    "FR": "Kazakhstan"
  },
  {
    "code": "LA",
    "EN": "Lao People's Democratic Republic",
    "FR": "Laos"
  },
  {
    "code": "LB",
    "EN": "Lebanon",
    "FR": "Liban"
  },
  {
    "code": "LC",
    "EN": "Saint Lucia",
    "FR": "Sainte-Lucie"
  },
  {
    "code": "LI",
    "EN": "Liechtenstein",
    "FR": "Liechtenstein"
  },
  {
    "code": "LK",
    "EN": "Sri Lanka",
    "FR": "Sri Lanka"
  },
  {
    "code": "LR",
    "EN": "Liberia",
    "FR": "Libéria"
  },
  {
    "code": "LS",
    "EN": "Lesotho",
    "FR": "Lesotho"
  },
  {
    "code": "LT",
    "EN": "Lithuania",
    "FR": "Lituanie"
  },
  {
    "code": "LU",
    "EN": "Luxembourg",
    "FR": "Luxembourg"
  },
  {
    "code": "LV",
    "EN": "Latvia",
    "FR": "Lettonie"
  },
  {
    "code": "LY",
    "EN": "Libya",
    "FR": "Libye"
  },
  {
    "code": "MA",
    "EN": "Morocco",
    "FR": "Maroc"
  },
  {
    "code": "MC",
    "EN": "Monaco",
    "FR": "Monaco"
  },
  {
    "code": "MD",
    "EN": "Moldova",
    "FR": "Moldavie"
  },
  {
    "code": "ME",
    "EN": "Montenegro",
    "FR": "Monténégro"
  },
  {
    "code": "MF",
    "EN": "Saint-Martin (France)",
    "FR": "Saint-Martin (France)"
  },
  {
    "code": "MG",
    "EN": "Madagascar",
    "FR": "Madagascar"
  },
  {
    "code": "MH",
    "EN": "Marshall Islands",
    "FR": "Îles Marshall"
  },
  {
    "code": "MK",
    "EN": "Macedonia",
    "FR": "Macédoine"
  },
  {
    "code": "ML",
    "EN": "Mali",
    "FR": "Mali"
  },
  {
    "code": "MM",
    "EN": "Myanmar",
    "FR": "Myanmar"
  },
  {
    "code": "MN",
    "EN": "Mongolia",
    "FR": "Mongolie"
  },
  {
    "code": "MO",
    "EN": "Macau",
    "FR": "Macao"
  },
  {
    "code": "MP",
    "EN": "Northern Mariana Islands",
    "FR": "Mariannes du Nord"
  },
  {
    "code": "MQ",
    "EN": "Martinique",
    "FR": "Martinique"
  },
  {
    "code": "MR",
    "EN": "Mauritania",
    "FR": "Mauritanie"
  },
  {
    "code": "MS",
    "EN": "Montserrat",
    "FR": "Montserrat"
  },
  {
    "code": "MT",
    "EN": "Malta",
    "FR": "Malte"
  },
  {
    "code": "MU",
    "EN": "Mauritius",
    "FR": "Maurice"
  },
  {
    "code": "MV",
    "EN": "Maldives",
    "FR": "Maldives"
  },
  {
    "code": "MW",
    "EN": "Malawi",
    "FR": "Malawi"
  },
  {
    "code": "MX",
    "EN": "Mexico",
    "FR": "Mexique"
  },
  {
    "code": "MY",
    "EN": "Malaysia",
    "FR": "Malaisie"
  },
  {
    "code": "MZ",
    "EN": "Mozambique",
    "FR": "Mozambique"
  },
  {
    "code": "NA",
    "EN": "Namibia",
    "FR": "Namibie"
  },
  {
    "code": "NC",
    "EN": "New Caledonia",
    "FR": "Nouvelle-Calédonie"
  },
  {
    "code": "NE",
    "EN": "Niger",
    "FR": "Niger"
  },
  {
    "code": "NF",
    "EN": "Norfolk Island",
    "FR": "Île Norfolk"
  },
  {
    "code": "NG",
    "EN": "Nigeria",
    "FR": "Nigeria"
  },
  {
    "code": "NI",
    "EN": "Nicaragua",
    "FR": "Nicaragua"
  },
  {
    "code": "NL",
    "EN": "The Netherlands",
    "FR": "Pays-Bas"
  },
  {
    "code": "NO",
    "EN": "Norway",
    "FR": "Norvège"
  },
  {
    "code": "NP",
    "EN": "Nepal",
    "FR": "Népal"
  },
  {
    "code": "NR",
    "EN": "Nauru",
    "FR": "Nauru"
  },
  {
    "code": "NU",
    "EN": "Niue",
    "FR": "Niue"
  },
  {
    "code": "NZ",
    "EN": "New Zealand",
    "FR": "Nouvelle-Zélande"
  },
  {
    "code": "OM",
    "EN": "Oman",
    "FR": "Oman"
  },
  {
    "code": "PA",
    "EN": "Panama",
    "FR": "Panama"
  },
  {
    "code": "PE",
    "EN": "Peru",
    "FR": "Pérou"
  },
  {
    "code": "PF",
    "EN": "French Polynesia",
    "FR": "Polynésie française"
  },
  {
    "code": "PG",
    "EN": "Papua New Guinea",
    "FR": "Papouasie-Nouvelle-Guinée"
  },
  {
    "code": "PH",
    "EN": "Philippines",
    "FR": "Philippines"
  },
  {
    "code": "PK",
    "EN": "Pakistan",
    "FR": "Pakistan"
  },
  {
    "code": "PL",
    "EN": "Poland",
    "FR": "Pologne"
  },
  {
    "code": "PM",
    "EN": "St. Pierre and Miquelon",
    "FR": "Saint-Pierre-et-Miquelon"
  },
  {
    "code": "PN",
    "EN": "Pitcairn",
    "FR": "Pitcairn"
  },
  {
    "code": "PR",
    "EN": "Puerto Rico",
    "FR": "Puerto Rico"
  },
  {
    "code": "PS",
    "EN": "Palestine, State of",
    "FR": "Palestine"
  },
  {
    "code": "PT",
    "EN": "Portugal",
    "FR": "Portugal"
  },
  {
    "code": "PW",
    "EN": "Palau",
    "FR": "Palau"
  },
  {
    "code": "PY",
    "EN": "Paraguay",
    "FR": "Paraguay"
  },
  {
    "code": "QA",
    "EN": "Qatar",
    "FR": "Qatar"
  },
  {
    "code": "RE",
    "EN": "Réunion",
    "FR": "Réunion"
  },
  {
    "code": "RO",
    "EN": "Romania",
    "FR": "Roumanie"
  },
  {
    "code": "RS",
    "EN": "Serbia",
    "FR": "Serbie"
  },
  {
    "code": "RU",
    "EN": "Russian Federation",
    "FR": "Russie"
  },
  {
    "code": "RW",
    "EN": "Rwanda",
    "FR": "Rwanda"
  },
  {
    "code": "SA",
    "EN": "Saudi Arabia",
    "FR": "Arabie saoudite"
  },
  {
    "code": "SB",
    "EN": "Solomon Islands",
    "FR": "Îles Salomon"
  },
  {
    "code": "SC",
    "EN": "Seychelles",
    "FR": "Seychelles"
  },
  {
    "code": "SD",
    "EN": "Sudan",
    "FR": "Soudan"
  },
  {
    "code": "SE",
    "EN": "Sweden",
    "FR": "Suède"
  },
  {
    "code": "SG",
    "EN": "Singapore",
    "FR": "Singapour"
  },
  {
    "code": "SH",
    "EN": "Saint Helena",
    "FR": "Sainte-Hélène"
  },
  {
    "code": "SI",
    "EN": "Slovenia",
    "FR": "Slovénie"
  },
  {
    "code": "SJ",
    "EN": "Svalbard and Jan Mayen Islands",
    "FR": "Svalbard et île de Jan Mayen"
  },
  {
    "code": "SK",
    "EN": "Slovakia",
    "FR": "Slovaquie"
  },
  {
    "code": "SL",
    "EN": "Sierra Leone",
    "FR": "Sierra Leone"
  },
  {
    "code": "SM",
    "EN": "San Marino",
    "FR": "Saint-Marin"
  },
  {
    "code": "SN",
    "EN": "Senegal",
    "FR": "Sénégal"
  },
  {
    "code": "SO",
    "EN": "Somalia",
    "FR": "Somalie"
  },
  {
    "code": "SR",
    "EN": "Suriname",
    "FR": "Suriname"
  },
  {
    "code": "SS",
    "EN": "South Sudan",
    "FR": "Soudan du Sud"
  },
  {
    "code": "ST",
    "EN": "Sao Tome and Principe",
    "FR": "Sao Tomé-et-Principe"
  },
  {
    "code": "SV",
    "EN": "El Salvador",
    "FR": "El Salvador"
  },
  {
    "code": "SX",
    "EN": "Sint Maarten (Dutch part)",
    "FR": "Saint-Martin (Pays-Bas)"
  },
  {
    "code": "SY",
    "EN": "Syria",
    "FR": "Syrie"
  },
  {
    "code": "SZ",
    "EN": "Swaziland",
    "FR": "Swaziland"
  },
  {
    "code": "TC",
    "EN": "Turks and Caicos Islands",
    "FR": "Îles Turks et Caicos"
  },
  {
    "code": "TD",
    "EN": "Chad",
    "FR": "Tchad"
  },
  {
    "code": "TF",
    "EN": "French Southern Territories",
    "FR": "Terres australes françaises"
  },
  {
    "code": "TG",
    "EN": "Togo",
    "FR": "Togo"
  },
  {
    "code": "TH",
    "EN": "Thailand",
    "FR": "Thaïlande"
  },
  {
    "code": "TJ",
    "EN": "Tajikistan",
    "FR": "Tadjikistan"
  },
  {
    "code": "TK",
    "EN": "Tokelau",
    "FR": "Tokelau"
  },
  {
    "code": "TL",
    "EN": "Timor-Leste",
    "FR": "Timor-Leste"
  },
  {
    "code": "TM",
    "EN": "Turkmenistan",
    "FR": "Turkménistan"
  },
  {
    "code": "TN",
    "EN": "Tunisia",
    "FR": "Tunisie"
  },
  {
    "code": "TO",
    "EN": "Tonga",
    "FR": "Tonga"
  },
  {
    "code": "TR",
    "EN": "Turkey",
    "FR": "Turquie"
  },
  {
    "code": "TT",
    "EN": "Trinidad and Tobago",
    "FR": "Trinité-et-Tobago"
  },
  {
    "code": "TV",
    "EN": "Tuvalu",
    "FR": "Tuvalu"
  },
  {
    "code": "TW",
    "EN": "Taiwan",
    "FR": "Taïwan"
  },
  {
    "code": "TZ",
    "EN": "Tanzania",
    "FR": "Tanzanie"
  },
  {
    "code": "UA",
    "EN": "Ukraine",
    "FR": "Ukraine"
  },
  {
    "code": "UG",
    "EN": "Uganda",
    "FR": "Ouganda"
  },
  {
    "code": "UM",
    "EN": "United States Minor Outlying Islands",
    "FR": "Îles mineures éloignées des États-Unis"
  },
  {
    "code": "US",
    "EN": "United States",
    "FR": "États-Unis"
  },
  {
    "code": "UY",
    "EN": "Uruguay",
    "FR": "Uruguay"
  },
  {
    "code": "UZ",
    "EN": "Uzbekistan",
    "FR": "Ouzbékistan"
  },
  {
    "code": "VA",
    "EN": "Vatican",
    "FR": "Vatican"
  },
  {
    "code": "VC",
    "EN": "Saint Vincent and the Grenadines",
    "FR": "Saint-Vincent-et-les-Grenadines"
  },
  {
    "code": "VE",
    "EN": "Venezuela",
    "FR": "Venezuela"
  },
  {
    "code": "VG",
    "EN": "Virgin Islands (British)",
    "FR": "Îles Vierges britanniques"
  },
  {
    "code": "VI",
    "EN": "Virgin Islands (U.S.)",
    "FR": "Îles Vierges américaines"
  },
  {
    "code": "VN",
    "EN": "Vietnam",
    "FR": "Vietnam"
  },
  {
    "code": "VU",
    "EN": "Vanuatu",
    "FR": "Vanuatu"
  },
  {
    "code": "WF",
    "EN": "Wallis and Futuna Islands",
    "FR": "Îles Wallis-et-Futuna"
  },
  {
    "code": "WS",
    "EN": "Samoa",
    "FR": "Samoa"
  },
  {
    "code": "YE",
    "EN": "Yemen",
    "FR": "Yémen"
  },
  {
    "code": "YT",
    "EN": "Mayotte",
    "FR": "Mayotte"
  },
  {
    "code": "ZA",
    "EN": "South Africa",
    "FR": "Afrique du Sud"
  },
  {
    "code": "ZM",
    "EN": "Zambia",
    "FR": "Zambie"
  },
  {
    "code": "ZW",
    "EN": "Zimbabwe",
    "FR": "Zimbabwe"
  }
]

module.exports = settings;

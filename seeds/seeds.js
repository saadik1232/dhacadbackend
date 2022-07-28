/**
 *  SQL Connection
 */
const sequelize = require("../configs/database");

/**
 *  Importing Json Web Token
 */
const jwt = require("jsonwebtoken");

/**
 *  JWT Token KEY
 */
const { KEY, Min } = require("./../configs/jwt");

/**
 *  SQl Database Models
 */
const Role = require("../models/role");
const User = require("../models/user");
const Service = require("../models/service");
const Nature = require("../models/nature");
const Priority = require("../models/priority");
const Status = require("../models/status");
const Panic = require("../models/panic");
const Log = require("../models/log");
const Subscription = require("../models/subscription");
const Bank = require("../models/bank");
const City = require("../models/city");
const Town = require("../models/town");
const thirdParty = require("../models/thirdParty");
const Geofence = require("../models/geofences");
const notificationLogs = require("../models/notificationLogs");
//my table
const Publicnotification = require("../models/publicnotification");
const Privatenotification = require("../models/privateNotification");
const UserNotification = require("../models/UserNotification");
/**
 * Database Model Relations
 */
Role.hasMany(User);
// Subscription.hasMany(User);
User.hasMany(Service);
Service.hasMany(Subscription);
Service.hasMany(Geofence);
Geofence.belongsTo(Service);
// Subscription.hasMany(User);
Nature.hasMany(Panic);
Status.hasMany(Panic);
Priority.hasMany(Panic);
User.belongsTo(Role);
// User.belongsTo(Subscription);
Service.belongsTo(User);
Panic.belongsTo(Status);
Panic.belongsTo(Nature);
Panic.belongsTo(Priority);
// User.belongsTo(Subscription);
Subscription.belongsTo(Service);
City.hasMany(Town);
Town.belongsTo(City);

/**
 *
  @param {} flag
 */
const tokenizer = async (data) => {
  data.userToken = await jwt.sign({ ...data }, KEY, { expiresIn: Min * 1000 });
  return data;
};

/**
 * Dummy Data for the Database
 */
var roles = [
  {
    name: "admin",
    active: 1,
  },
  {
    name: "supervisor",
    active: 1,
  },
  {
    name: "operator",
    active: 1,
  },
  {
    name: "responder",
    active: 1,
  },
  {
    name: "customer",
    active: 1,
  },
  {
    name: "customer-family",
    active: 1,
  },
  {
    name: "main-screen",
    active: 1,
  },
  {
    name: "responder-member",
    active: 1,
  },
  {
    name: "GSM",
    active: 1,
  },
  {
    name: "super-admin",
    active: 1,
  },
];
var geofences = [
  {
    geofenceId: 118,
    serviceId: 1,
  },
];
var users = [
  {
    firstname: "super",
    lastname: "admin",
    cnic: "",
    contact: "0900786022",
    email: "zaeemtarrar3@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 10,
    role: { id: 10, name: roles[1 - 1].name, active: roles[1 - 1].active },
    groupId: 95,
  },
  {
    firstname: "admin_1",
    lastname: "admin_1",
    cnic: "",
    contact: "0900786023",
    email: "zaeemtarrar3@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 1,
    role: { id: 1, name: roles[1 - 1].name, active: roles[1 - 1].active },
    groupId: 96,
    extNumber: "6001",
    extPass: "60011234",
  },
  {
    firstname: "admin_2",
    lastname: "admin_2",
    cnic: "",
    contact: "0900786024",
    email: "zaeemtarrar3@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 1,
    role: { id: 1, name: roles[1 - 1].name, active: roles[1 - 1].active },
    groupId: 97,
    extNumber: "6003",
    extPass: "60031234",
  },
  // {
  //   firstname: "adnan",
  //   lastname: "adnan",
  //   cnic: "",
  //   contact: "03209988776",
  //   email: "adnan@gmail.com",
  //   password: "123456",
  //   lat: 0,
  //   lng: 0,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 2,
  //   role: { id: 2, name: roles[2 - 1].name, active: roles[2 - 1].active },
  //   isSupervisor: true,
  // },
  {
    firstname: "supr_1",
    lastname: "supr_1",
    cnic: "",
    contact: "0900786099",
    email: "adnan@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 2,
    role: { id: 2, name: roles[2 - 1].name, active: roles[2 - 1].active },
    isSupervisor: true,
    groupId: 127,
    extNumber: "6004",
    extPass: "60041234",
  },
  {
    firstname: "supr_2",
    lastname: "supr_2",
    cnic: "",
    contact: "0900786077",
    email: "adnan@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 2,
    role: { id: 2, name: roles[2 - 1].name, active: roles[2 - 1].active },
    isSupervisor: true,
    groupId: 99,
    extNumber: "6101",
    extPass: "61011234",
  },
  {
    firstname: "supr_3",
    lastname: "supr_3",
    cnic: "",
    contact: "03209988775",
    email: "adnan@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 2,
    role: { id: 2, name: roles[2 - 1].name, active: roles[2 - 1].active },
    isSupervisor: true,
    groupId: 100,
    extNumber: "6102",
    extPass: "61021234",
  },
  {
    firstname: "supr_4",
    lastname: "supr_4",
    cnic: "",
    contact: "03209988774",
    email: "adnan@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 2,
    role: { id: 2, name: roles[2 - 1].name, active: roles[2 - 1].active },
    isSupervisor: true,
    groupId: 101,
    extNumber: "6103",
    extPass: "61031234",
  },
  // {
  //   firstname: "nick",
  //   lastname: "robert",
  //   cnic: "",
  //   contact: "111244622",
  //   email: "gsm@gmail.com",
  //   password: "123456",
  //   lat: 0,
  //   lng: 0,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 9,
  //   //role: { id: 9, name: roles[9 - 1].name, active: roles[9 - 1].active },
  //   isSupervisor: true,
  // },
  // {
  //   firstname: "ali",
  //   lastname: "ahmad",
  //   cnic: "",
  //   contact: "03249775531",
  //   email: "ali@gmail.com",
  //   password: "123456",
  //   lat: 31.3695,
  //   lng: 74.1768,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 112,
  //   uniqueId: "915397",
  // },
  // {
  //   firstname: "naqash",
  //   lastname: "butt",
  //   cnic: "",
  //   contact: "03212345678",
  //   email: "naqash@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 49,
  //   uniqueId: "868003032431681",
  // },
  // {
  //   firstname: "bilal",
  //   lastname: "bhatti",
  //   cnic: "",
  //   contact: "03238421376",
  //   email: "blitzbhatti@gmail.com",
  //   password: "123456",
  //   lat: 0,
  //   lng: 0,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 3,
  //   role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
  // },
  {
    firstname: "opr_1",
    lastname: "opr_1",
    cnic: "",
    contact: "03238421375",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 102,
    extNumber: "6100",
    extPass: "60041234",
  },
  {
    firstname: "opr_2",
    lastname: "opr_2",
    cnic: "",
    contact: "03238421374",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 103,
    extNumber: "6002",
    extPass: "60021234",
  },
  {
    firstname: "opr_3",
    lastname: "opr_3",
    cnic: "",
    contact: "03238421373",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 104,
    extNumber: "6005",
    extPass: "60051234",
  },
  {
    firstname: "opr_4",
    lastname: "opr_4",
    cnic: "",
    contact: "03238421372",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 105,
    extNumber: "6006",
    extPass: "60061234",
  },
  {
    firstname: "opr_5",
    lastname: "opr_5",
    cnic: "",
    contact: "03238421371",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 106,
    extNumber: "6007",
    extPass: "60071234",
  },
  {
    firstname: "opr_6",
    lastname: "opr_6",
    cnic: "",
    contact: "03238421370",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 107,
    extNumber: "6008",
    extPass: "60081234",
  },
  {
    firstname: "opr_7",
    lastname: "opr_7",
    cnic: "",
    contact: "03238421369",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 108,
    extNumber: "6009",
    extPass: "60091234",
  },
  {
    firstname: "opr_8",
    lastname: "opr_8",
    cnic: "",
    contact: "03238421368",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 109,
    extNumber: "6010",
    extPass: "60101234",
  },
  {
    firstname: "opr_9",
    lastname: "opr_9",
    cnic: "",
    contact: "03238421367",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 110,
    extNumber: "6011",
    extPass: "60111234",
  },
  {
    firstname: "opr_10",
    lastname: "opr_10",
    cnic: "",
    contact: "03238421365",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 111,
    extNumber: "6012",
    extPass: "60121234",
  },
  {
    firstname: "opr_11",
    lastname: "opr_11",
    cnic: "",
    contact: "03238421364",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 112,
    extNumber: "6013",
    extPass: "60131234",
  },
  {
    firstname: "opr_12",
    lastname: "opr_12",
    cnic: "",
    contact: "03238421363",
    email: "blitzbhatti@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 3,
    role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
    groupId: 113,
    extNumber: "6014",
    extPass: "60141234",
  },
  // {
  //   firstname: "thatha",
  //   lastname: "thatha",
  //   cnic: "",
  //   contact: "03238421377",
  //   email: "blitzbhatti@gmail.com",
  //   password: "123456",
  //   lat: 0,
  //   lng: 0,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 3,
  //   role: { id: 3, name: roles[3 - 1].name, active: roles[3 - 1].active },
  // },
  {
    firstname: "usman",
    lastname: "rajpoot",
    cnic: "35202-9998885554-0",
    contact: "+923238421376",
    email: "usman@gmail.com",
    password: "123456",
    lat: 30.254951,
    lng: 71.49135,
    address: "Broadway Road Plot 10 DHA Phase 8, Lahore",
    mapAddress: "Broadway Road Plot 10 DHA Phase 8, Lahore",
    service_provider_id: 1,
    roleId: 5,
    groupId: 99,
    role: { id: 5, name: roles[5 - 1].name, active: roles[5 - 1].active },
    extNumber: "1002",
    extPass: "10021234",
  },
  // {
  //   firstname: "shadab",
  //   lastname: "rajpoot",
  //   cnic: "",
  //   contact: "cust2",
  //   email: "usman@gmail.com",
  //   password: "123456",
  //   lat: 31.4352,
  //   lng: 31.4322,
  //   address: "",
  //   service_provider_id: 1,
  //   roleId: 5,
  //   role: { id: 5, name: roles[5 - 1].name, active: roles[5 - 1].active },
  // },
  // {
  //   firstname: "kamran",
  //   lastname: "bhai",
  //   cnic: "",
  //   contact: "03204545666",
  //   email: "kamran@gmail.com",
  //   password: "123456",
  //   lat: 0,
  //   lng: 0,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 6,
  //   role: { id: 6, name: roles[6 - 1].name, active: roles[6 - 1].active },
  // },
  {
    firstname: "main",
    lastname: "screen1",
    cnic: "",
    contact: "543210",
    email: "main@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 7,
    role: { id: 7, name: roles[7 - 1].name, active: roles[7 - 1].active },
    groupId: 128,
  },
  {
    firstname: "main",
    lastname: "screen2",
    cnic: "",
    contact: "987654",
    email: "main@gmail.com",
    password: "123456",
    lat: 0,
    lng: 0,
    address: "",
    service_provider_id: 0,
    roleId: 7,
    role: { id: 7, name: roles[7 - 1].name, active: roles[7 - 1].active },
    groupId: 129,
  },
  {
    firstname: "Res_1",
    lastname: "Res_1",
    cnic: "",
    contact: "111111",
    email: "res1@gmail.com",
    password: "123456",
    lat: 31.3681,
    lng: 74.1854,
    address: "",
    service_provider_id: 0,
    roleId: 4,
    role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
    userAssignment: 0,
    trackingId: 251,
    uniqueId: "609474",
    groupId: 114,
    extNumber: "1001",
    extPass: "10011234",
    type: "emergency",
  },
  {
    firstname: "Res_2",
    lastname: "Res_2",
    cnic: "",
    contact: "222222",
    email: "res2@gmail.com",
    password: "123456",
    lat: 31.3681,
    lng: 74.1854,
    address: "",
    service_provider_id: 0,
    roleId: 4,
    role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
    userAssignment: 0,
    trackingId: 252,
    uniqueId: "272451",
    groupId: 115,
    extNumber: "1003",
    extPass: "10031234",
    type: "utility",
  },
  // {
  //   firstname: "Res_3",
  //   lastname: "Res_3",
  //   cnic: "",
  //   contact: "333333",
  //   email: "res3@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 253,
  //   uniqueId: "75455",
  //   groupId: 116,
  //   extNumber: "1004",
  //   extPass: "10041234",
  //   type: "emergency",
  // },
  // {
  //   firstname: "Res_4",
  //   lastname: "Res_4",
  //   cnic: "",
  //   contact: "444444",
  //   email: "res4@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 254,
  //   uniqueId: "80505",
  //   groupId: 117,
  //   extNumber: "1005",
  //   extPass: "10051234",
  //   type: "emergency",
  // },
  // {
  //   firstname: "Res_5",
  //   lastname: "Res_5",
  //   cnic: "",
  //   contact: "555555",
  //   email: "res5@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 255,
  //   uniqueId: "220049",
  //   groupId: 118,
  //   extNumber: "1006",
  //   extPass: "10061234",
  //   type: "gas",
  // },
  // {
  //   firstname: "Res_6",
  //   lastname: "Res_6",
  //   cnic: "",
  //   contact: "666666",
  //   email: "res6@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 256,
  //   uniqueId: "49211",
  //   groupId: 119,
  //   extNumber: "1007",
  //   extPass: "10071234",
  //   type: "gas",
  // },
  // {
  //   firstname: "Res_7",
  //   lastname: "Res_7",
  //   cnic: "",
  //   contact: "777777",
  //   email: "res7@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 257,
  //   uniqueId: "550142",
  //   groupId: 120,
  //   extNumber: "1008",
  //   extPass: "10081234",
  //   type: "electric",
  // },
  // {
  //   firstname: "Res_8",
  //   lastname: "Res_8",
  //   cnic: "",
  //   contact: "888888",
  //   email: "res8@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 258,
  //   uniqueId: "278662",
  //   groupId: 121,
  //   extNumber: "1009",
  //   extPass: "10091234",
  //   type: "electric",
  // },
  // {
  //   firstname: "Res_9",
  //   lastname: "Res_9",
  //   cnic: "",
  //   contact: "999999",
  //   email: "res9@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 259,
  //   uniqueId: "467244",
  //   groupId: 122,
  //   extNumber: "1010",
  //   extPass: "10101234",
  //   type: "water",
  // },
  // {
  //   firstname: "Res_10",
  //   lastname: "Res_10",
  //   cnic: "",
  //   contact: "101010",
  //   email: "res10@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 4,
  //   role: { id: 4, name: roles[4 - 1].name, active: roles[4 - 1].active },
  //   userAssignment: 0,
  //   trackingId: 260,
  //   uniqueId: "469746",
  //   groupId: 123,
  //   extNumber: "1011",
  //   extPass: "10111234",
  //   type: "water",
  // },
  // {
  //   firstname: "gsm",
  //   lastname: "gsm",
  //   cnic: "",
  //   contact: "0320111111",
  //   email: "gsm@gmail.com",
  //   password: "123456",
  //   lat: 31.3681,
  //   lng: 74.1854,
  //   address: "",
  //   service_provider_id: 0,
  //   roleId: 9,
  //   role: { id: 4, name: roles[9 - 1].name, active: roles[9 - 1].active },
  //   userAssignment: 0,
  //   // trackingId: 29,
  //   // uniqueId: "219167",
  // },
];
var service = [
  {
    name: "Dha Phase 8",
    userId: 1,
  },
  {
    name: "Valencia",
    userId: 1,
  },
  {
    name: "Bahria Town",
    userId: 1,
  },
  {
    name: "Township",
    userId: 1,
  },
  {
    name: "Wapda Town",
    userId: 1,
  },
  {
    name: "Gulberg",
    userId: 1,
  },
];
var subscriptions = [
  {
    title: "Bronze",
    description: "Lorem Ipsum",
    cost: 1000,
    duration: 30,
    usersAllowed: 3,
    devicesAllowed: 3,
    serviceId: 1,
  },
  {
    title: "Silver",
    description: "Lorem Ipsum",
    cost: 2000,
    duration: 60,
    usersAllowed: 5,
    devicesAllowed: 4,
    serviceId: 1,
  },
  {
    title: "Gold",
    description: "Lorem Ipsum",
    cost: 3000,
    duration: 90,
    usersAllowed: 10,
    devicesAllowed: 10,
    serviceId: 2,
  },
];
var natures = [
  {
    name: "Emergency",
    active: 1,
  },
  {
    name: "Medical",
    active: 1,
  },
  {
    name: "Fire Alarm",
    active: 1,
  },
];
var priorities = [
  {
    name: "Normal",
    active: 1,
  },
  {
    name: "Medium",
    active: 1,
  },
  {
    name: "High",
    active: 1,
  },
];
var statuses = [
  {
    name: "In Query",
    active: 1,
  },
  {
    name: "Confirmed By Operator Or Supervisor",
    active: 1,
  },
  {
    name: "Assigned To Responder",
    active: 1,
  },
  {
    name: "Resolved By Responder",
    active: 1,
  },
  {
    name: "Resolved By Operator",
    active: 1,
  },
  {
    name: "ResolvedBySupervisor",
    active: 1,
  },
  {
    name: "Confirmed By Responder",
    active: 1,
  },
  {
    name: "Closed By Customer",
    active: 1,
  },
  {
    name: "Pop Out",
    active: 1,
  },
];
var bankAccounts = [
  {
    accountName: "zaeem tarrar",
    accountNo: "1305223024342",
    accountPin: "237",
  },
];
var cities = [
  {
    name: "Lahore",
  },
  {
    name: "Islamabad",
  },
  {
    name: "Karachi",
  },
];
var towns = [
  {
    name: "Society A",
    cityId: 1,
  },
  {
    name: "Society B",
    cityId: 1,
  },
  {
    name: "Society C",
    cityId: 2,
  },
  {
    name: "Society D",
    cityId: 2,
  },
  {
    name: "Society E",
    cityId: 3,
  },
  {
    name: "Society F",
    cityId: 3,
  },
];
//my table data
var publicnotification = [
  {
    heading: "this is heading",
    Message: "this is message body",
    topic: "this is topic ",
    image_name: "this is image src",
    active: 1,
    priority: 1,
    time: "",
  },
];
var privatenotification = [
  {
    heading: "this is heading",
    Message: "this is message body",
    FCM_token: "this is topic ",
    image_name: "this is image src",
    active: 1,
    priority: 1,
    time: "",
  },
];
var usernotification = [
  {
    start_date: "this is user notification statrting date",
    end_date: "this is user notification end date",
    user_name: "this is user name ",
    user_address: "this is user address",
  },
];

/**
 *  Method to Refresh the Database
 */
const refresh = async (flag = false) => {
  if (flag) {
    sequelize
      .sync({ force: true })
      .then((result) => {
        seed();
        console.log(
          "Complete Database Refreshed and Seeds Created Successfully !"
        );
      })
      .catch((e) => console.log("MySQL Database Refreshing Error : ", e));
  }
};

/**
 * Method to Seed the Dummy Data in the Database
 */
const seed = async () => {
  await Role.bulkCreate(roles)
    .then((result) => {})
    .catch((e) => console.log("Roles Seeding Error !"));
  await User.bulkCreate(users)
    .then((result) => {})
    .catch((e) => console.log("Users Seeding Error !"));
  await Service.bulkCreate(service)
    .then((result) => {})
    .catch((e) => console.log("Service Providers Seeding Error !"));
  await Nature.bulkCreate(natures)
    .then((result) => {})
    .catch((e) => console.log("Natures Seeding Error !"));
  await Priority.bulkCreate(priorities)
    .then((result) => {})
    .catch((e) => console.log("Priorities Seeding Error !"));
  await Status.bulkCreate(statuses)
    .then((result) => {})
    .catch((e) => console.log("Statuses Seeding Error !"));
  await Subscription.bulkCreate(subscriptions)
    .then((result) => {})
    .catch((e) => console.log("Subscription Seeding Error !"));
  await Bank.bulkCreate(bankAccounts)
    .then((result) => {})
    .catch((e) => console.log("Bank Accounts Seeding Error !"));
  await City.bulkCreate(cities)
    .then((result) => {})
    .catch((e) => console.log("Cities Seeding Error !"));
  await Town.bulkCreate(towns)
    .then((result) => {})
    .catch((e) => console.log("Towns Seeding Error !"));
  await Geofence.bulkCreate(geofences)
    .then((result) => {})
    .catch((e) => console.log("Geofences Seeding Error !"));
  // my table data
  await Publicnotification.bulkCreate(publicnotification)
    .then((result) => {})
    .catch((e) => console.log("public notification Seeding Error !"));
  await Privatenotification.bulkCreate(privatenotification)
    .then((result) => {})
    .catch((e) => console.log("private notification Seeding Error !"));
  await UserNotification.bulkCreate(usernotification)
    .then((result) => {})
    .catch((e) => console.log("private notification Seeding Error !"));
};

module.exports = refresh;

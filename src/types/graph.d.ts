export const typeDefs = ["type GetChatResponse {\n  ok: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  GetChat(chatId: Int!): GetChatResponse!\n  sayHello(name: String!): Greeting!\n  GetMyPlaces: GetMyPlacesResponse!\n  GetNearbyDrivers: GetNearbyDriversResponse!\n  GetNearbyRide: GetNearbyRideResponse!\n  GetRide(rideId: Int!): GetRideResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype Subscription {\n  MessageSubscription: Message\n  NearbyRideSubscription: Ride\n  RideStatusSubscription: Ride\n  DriversSubscription: User\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendMessage(text: String!, chatId: Int!): SendMessageResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFavorite: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(id: Int!, name: String, isFavorite: Boolean): EditPlaceResponse!\n  RequestRide(pickUpAddress: String!, pickUpLat: Float!, pickUpLng: Float!, dropOffAddress: String!, dropOffLat: Float!, dropOffLng: Float!, price: Float!, duration: String!, distance: String!): RequestRideResponse!\n  UpdateRideStatus(rideId: Int!, status: rideStatus!): UpdateRideStatusResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, profilePhoto: String, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  ReportMovement(orientation: Float, lng: Float, lat: Float): ReportMovementResponse!\n  RequestEmailVerification: RequestEmailVerificationResonse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  ToggleDrivingMode: ToggleDrivingModeResponse!\n  UpdateMyProfile(firstName: String, lastName: String, password: String, profilePhoto: String, age: Int): UpdateMyProfileResponse!\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  passengerId: Int!\n  passenger: User!\n  driverId: Int!\n  driver: User!\n  ride: Ride\n  rideId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  chatId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Greeting {\n  error: Boolean!\n  text: String!\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponse {\n  ok: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype GetNearbyDriversResponse {\n  ok: Boolean!\n  error: String\n  drivers: [User]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFavorite: Boolean!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetNearbyRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype GetRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype RequestRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  duration: String!\n  distance: String!\n  driver: User\n  passenger: User!\n  chat: Chat\n  chatId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateRideStatusResponse {\n  ok: Boolean!\n  error: String\n  id: Int\n}\n\nenum rideStatus {\n  ACCEPTED\n  FINISHED\n  CANCLED\n  REQUESTING\n  ONROUTE\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestEmailVerificationResonse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  fbId: String\n  chatsAsPassenger: [Chat]\n  chatsAsDriver: [Chat]\n  places: [Place]\n  messages: [Message]\n  ridesAsPassenger: [Ride]\n  ridesAsDriver: [Ride]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ToggleDrivingModeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChat: GetChatResponse;
  sayHello: Greeting;
  GetMyPlaces: GetMyPlacesResponse;
  GetNearbyDrivers: GetNearbyDriversResponse;
  GetNearbyRide: GetNearbyRideResponse;
  GetRide: GetRideResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetChatQueryArgs {
  chatId: number;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface GetRideQueryArgs {
  rideId: number;
}

export interface GetChatResponse {
  ok: boolean;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  passengerId: number;
  passenger: User;
  driverId: number;
  driver: User;
  ride: Ride | null;
  rideId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  chatId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  fbId: string | null;
  chatsAsPassenger: Array<Chat> | null;
  chatsAsDriver: Array<Chat> | null;
  places: Array<Place> | null;
  messages: Array<Message> | null;
  ridesAsPassenger: Array<Ride> | null;
  ridesAsDriver: Array<Ride> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFavorite: boolean;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Ride {
  id: number;
  status: string;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  duration: string;
  distance: string;
  driver: User | null;
  passenger: User;
  chat: Chat | null;
  chatId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Greeting {
  error: boolean;
  text: string;
}

export interface GetMyPlacesResponse {
  ok: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetNearbyDriversResponse {
  ok: boolean;
  error: string | null;
  drivers: Array<User> | null;
}

export interface GetNearbyRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface GetRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  SendMessage: SendMessageResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  RequestRide: RequestRideResponse;
  UpdateRideStatus: UpdateRideStatusResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  ReportMovement: ReportMovementResponse;
  RequestEmailVerification: RequestEmailVerificationResonse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  ToggleDrivingMode: ToggleDrivingModeResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface SendMessageMutationArgs {
  text: string;
  chatId: number;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFavorite: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  id: number;
  name: string | null;
  isFavorite: boolean | null;
}

export interface RequestRideMutationArgs {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  duration: string;
  distance: string;
}

export interface UpdateRideStatusMutationArgs {
  rideId: number;
  status: rideStatus;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string | null;
  age: number;
  phoneNumber: string;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface ReportMovementMutationArgs {
  orientation: number | null;
  lng: number | null;
  lat: number | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  profilePhoto: string | null;
  age: number | null;
}

export interface SendMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export type rideStatus = "ACCEPTED" | "FINISHED" | "CANCLED" | "REQUESTING" | "ONROUTE";

export interface UpdateRideStatusResponse {
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestEmailVerificationResonse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleDrivingModeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: Message | null;
  NearbyRideSubscription: Ride | null;
  RideStatusSubscription: Ride | null;
  DriversSubscription: User | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

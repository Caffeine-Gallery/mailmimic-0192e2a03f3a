import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Email {
  'to' : string,
  'subject' : string,
  'date' : string,
  'from' : string,
  'message' : string,
}
export interface _SERVICE {
  'getEmails' : ActorMethod<[string], Array<Email>>,
  'login' : ActorMethod<[string, string], boolean>,
  'sendEmail' : ActorMethod<[string, string, string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

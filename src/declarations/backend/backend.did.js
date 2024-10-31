export const idlFactory = ({ IDL }) => {
  const Email = IDL.Record({
    'to' : IDL.Text,
    'subject' : IDL.Text,
    'date' : IDL.Text,
    'from' : IDL.Text,
    'message' : IDL.Text,
  });
  return IDL.Service({
    'getEmails' : IDL.Func([IDL.Text], [IDL.Vec(Email)], ['query']),
    'login' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'sendEmail' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

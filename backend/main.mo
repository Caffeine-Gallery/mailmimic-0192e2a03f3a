import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";

actor {
  type Email = {
    from: Text;
    to: Text;
    subject: Text;
    message: Text;
    date: Text;
  };

  let users = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);
  let emails = HashMap.HashMap<Text, [Email]>(10, Text.equal, Text.hash);

  // Simulated user data
  users.put("user1@example.com", "password1");
  users.put("user2@example.com", "password2");

  // Simulated email data
  let user1Emails : [Email] = [
    { from = "sender1@example.com"; to = "user1@example.com"; subject = "Hello"; message = "How are you?"; date = "2023-06-01" },
    { from = "sender2@example.com"; to = "user1@example.com"; subject = "Meeting"; message = "Let's schedule a meeting"; date = "2023-06-02" }
  ];
  emails.put("user1@example.com", user1Emails);

  public func login(email : Text, password : Text) : async Bool {
    switch (users.get(email)) {
      case (?storedPassword) { storedPassword == password };
      case null { false };
    };
  };

  public query func getEmails(user : Text) : async [Email] {
    switch (emails.get(user)) {
      case (?userEmails) { userEmails };
      case null { [] };
    };
  };

  public func sendEmail(from : Text, to : Text, subject : Text, message : Text) : async () {
    let newEmail : Email = {
      from = from;
      to = to;
      subject = subject;
      message = message;
      date = Int.toText(Time.now());
    };

    switch (emails.get(to)) {
      case (?userEmails) {
        let updatedEmails = Array.append(userEmails, [newEmail]);
        emails.put(to, updatedEmails);
      };
      case null {
        emails.put(to, [newEmail]);
      };
    };
  };
};

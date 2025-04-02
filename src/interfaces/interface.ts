export interface messagesInterface {
  id: number;
  friend_id: number;
  list_message: messageInterface[];
}

export interface messageInterface {
  content: string;
  sender_username: string;
  receiver_username: string;
  receiver_id: number;
  is_read: number;
  timestamp: string;
}

export interface profileInterface {
  id: number;
  username: string;
  is_online: number;
}

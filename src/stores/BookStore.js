import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { makeAutoObservable } from "mobx";
import { mockBookList } from "../mock-data/mockBookData";

export class BookStore {
  constructor() {
    makeAutoObservable(this);
  }

  books = mockBookList;
  navigation = useNavigation();

  // load books from async storage once
  loadBooks = async () => {
    const json = await AsyncStorage.getItem("@lists");
    const data = json ? JSON.parse(json) : [];
    this.books = data;
  };

  // save books to async storage
  saveBooks = async () => {
    AsyncStorage.setItem("@lists", JSON.stringify(state.books));
  };

  addBook = (book, status) => {
    this.books.unshift({ ...book, status });
    this.saveBooks();
  };

  updateBook = (book, status) => {
    const index = state.books.findIndex((b) => b.bookId === book.bookId);
    if (index !== -1) state.books[index] = { ...book, status };
    this.saveBooks();
  };

  removeBook = (book) => {
    const index = state.books.findIndex((b) => b.bookId === book.bookId);
    if (index !== -1) state.books.splice(index, 1);
    this.saveBooks();
  };
}

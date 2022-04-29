import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { proxy, useSnapshot } from "valtio";
import { setBookState, useBooksState } from "../BookStore";
import Text from "./Text";
import { useToast } from "./Toast";

// create store using zustant & immer
const state = proxy({
  book: null,
});

// book modal using modalize
export default function StatusModal() {
  const toast = useToast();
  const { colors, margin, status } = useTheme();
  const { book } = useSnapshot(state);
  const { books } = useBooksState();
  const { addBook, updateBook, removeBook } = setBookState();
  const ref = useRef();

  // modal styles
  const styles = StyleSheet.create({
    modal: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    content: {
      padding: margin,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingBottom: status,
      backgroundColor: colors.card,
    },
    bookTitle: {
      opacity: 0.5,
    },
    flexRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    marginB: {
      marginBottom: margin,
    },
    iconLeft: {
      fontSize: 21,
      color: colors.text,
      marginRight: margin,
    },
    statusText: {
      marginRight: "auto",
    },
  });

  // close status bottom sheet
  const closeSheet = () => {
    Haptics.notificationAsync("success");
    ref.current?.close();
  };

  // reset state on close
  const onClosed = () => {
    state.book = null;
  };

  // find book to update or remove from list
  const updateList = (list) => {
    const index = books.findIndex((b) => b.bookId === book.bookId);
    if (index === -1) {
      updateBook(book, list);
      toast.show(`Kitap favorilerime eklendi.`);
    } else {
      updateBook(book, list);
      toast.show("Kitap favorilerimden kaldırıldı.");
    }
    closeSheet();
  };

  // if book set, open modal
  useEffect(() => {
    if (book) {
      ref.current?.open();
    }
  }, [book]);

  // find the book in lists
  let item = books.find((b) => b.bookId === book?.bookId);
  if (!item) item = book;

  return (
    <Modalize
      ref={ref}
      threshold={50}
      onClosed={onClosed}
      modalStyle={styles.modal}
      adjustToContentHeight
    >
      <View style={styles.content}>
        <View style={[styles.flexRow]}>
          <Text bold size={20}>
            {/* {item?.status ? "Update List" : "Add to List"} */}
          </Text>
          <Text bold onPress={closeSheet}>
            Tamam
          </Text>
        </View>
        <Text numberOfLines={1} style={[styles.bookTitle, styles.marginB]}>
          {item?.bookTitleBare}
        </Text>
        {/* <Pressable
          onPress={() => updateList("Reading")}
          style={[styles.flexRow, styles.marginB]}
        >
          <AntDesign name="rocket1" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>
            Devam Eden
          </Text>
          <AntDesign
            size={21}
            color={colors.text}
            name={item?.status === "Reading" ? "check" : ""}
          />
        </Pressable> */}
        {/* <Pressable
          onPress={() => updateList("Completed")}
          style={[styles.flexRow, styles.marginB]}
        >
          <AntDesign name="Trophy" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>
            Okuduklarım
          </Text>
          <AntDesign
            size={21}
            color={colors.text}
            name={item?.status === "Completed" ? "check" : ""}
          />
        </Pressable> */}
        <Pressable
          onPress={() => {
            if (item?.status !== "Favorite") {
              updateList("Favorite");
            } else {
              updateList("Recommended");
            }
          }}
          style={[styles.flexRow, styles.marginB]}
        >
          <AntDesign name="book" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>
            {item?.status === "Favorite"
              ? "Favorilerimden kaldır"
              : "Favorilerime ekle"}
          </Text>
          <AntDesign
            size={21}
            color={colors.text}
            name={item?.status === "Favorite" ? "check" : ""}
          />
        </Pressable>
        <Pressable onPress={() => {}} style={[styles.flexRow, styles.marginB]}>
          <AntDesign name="like2" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>
            Beğen
          </Text>
          <AntDesign
            size={21}
            color={colors.text}
            name={item?.status === "Wishlist" ? "check" : ""}
          />
        </Pressable>
        <Pressable onPress={() => {}} style={[styles.flexRow, styles.marginB]}>
          <AntDesign name="sharealt" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>
            Paylaş
          </Text>
          <AntDesign
            size={21}
            color={colors.text}
            name={item?.status === "Wishlist" ? "check" : ""}
          />
        </Pressable>

        {/* <Pressable
          onPress={() => updateList("Remove")}
          style={[styles.flexRow, styles.marginB]}
        >
          <AntDesign name="delete" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>
            Remove
          </Text>
        </Pressable> */}
      </View>
    </Modalize>
  );
}

// export dispatch
export const setModal = (book) => {
  state.book = book;
};

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const seatPrice = (row) => 100 * (row + 1);

const Seat = ({ row, column, selected, booked, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.seat,
        {
          backgroundColor: booked ? "grey" : selected ? "blue" : "white"
        }
      ]}
      onPress={() => onPress(row, column)}
      disabled={booked}
    />
  );
};

const SeatingRow = ({ seats, onPress }) => {
  return (
    <View style={styles.seatingRow}>
      {seats.map((seat, index) => (
        <Seat
          key={index}
          row={seat.row}
          column={seat.column}
          selected={seat.selected}
          booked={seat.booked}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

const SeatingLayout = ({ rows, columns }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const handleSeatPress = (row, column) => {
    const seatIndex = selectedSeats.findIndex(
      (seat) => seat.row === row && seat.column === column
    );
    if (seatIndex >= 0) {
      setSelectedSeats([
        ...selectedSeats.slice(0, seatIndex),
        ...selectedSeats.slice(seatIndex + 1)
      ]);
    } else {
      setSelectedSeats([...selectedSeats, { row, column, selected: true }]);
    }
  };

  const seats = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      seats.push({
        row: i,
        column: j,
        selected:
          selectedSeats.findIndex(
            (seat) => seat.row === i && seat.column === j
          ) >= 0,
        booked:
          bookedSeats.findIndex(
            (seat) => seat.row === i && seat.column === j
          ) >= 0
      });
    }
  }

  const totalPrice = selectedSeats.reduce(
    (acc, seat) => acc + seatPrice(seat.row),
    0
  );

  const handleBookNowPress = () => {
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>Screen Here</View>
      {seats.map((seat, index) => {
        if (index % columns === 0) {
          return (
            <SeatingRow
              key={index}
              seats={seats.slice(index, index + columns)}
              onPress={handleSeatPress}
            />
          );
        }
        return null;
      })}
      <View style={styles.bookNowContainer}>
        <Text style={styles.totalPriceText}>Total Price: ₹ {totalPrice}</Text>
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={handleBookNowPress}
        >
          <Text style={styles.bookNowButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 25,
    marginBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#5A5A5A"
  },
  seatingRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  seat: {
    width: 50,
    height: 30,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black"
  },
  bookNowContainer: {
    marginTop: 20
  },
  totalPriceText: {
    fontSize: 20
  },
  bookNowButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    textAlign: "center"
  },
  bookNowButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default SeatingLayout;

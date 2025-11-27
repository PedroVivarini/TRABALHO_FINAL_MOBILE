import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232228",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  titulo: {
    alignItems: "center",
    marginBottom: 20,

  },
  textTitulo: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  button: {
    padding: 18,
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#171719",

  },
  textButton: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 18,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#171719',
    borderRadius: 15,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  labelText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },

});


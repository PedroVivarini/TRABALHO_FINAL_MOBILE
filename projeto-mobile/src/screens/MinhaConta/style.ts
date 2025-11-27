import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232228',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  PerfilImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#7b24ff',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  nameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  memberText: {
    color: 'rgba(204, 204, 204, 1)',
    fontSize: 14,
  },
  emailText: {
    color: '#AD75FB',
    fontSize: 14,
  },

  statsCard: {
    backgroundColor: '#171719',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  statsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsSubtitle: {
    color: '#999999',
    fontSize: 14,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    marginTop: 10
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderColor: 'red',
  },
  deleteText: {
    color: 'red',
  },
  versionText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 20,
    marginBottom: 40,
  },
});
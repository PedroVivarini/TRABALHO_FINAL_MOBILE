import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const COLORS = {
  background: '#1e1e1e',
  card: '#252526',
  textPrimary: '#cccccc',
  textSecondary: '#808080',
  accent: '#007acc',
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 15,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 6,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
    paddingBottom: 5,
  },

  languagesSection: {
    marginBottom: 20,
  },
  languageContainer: {
    marginBottom: 10,
  },
  languageName: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  languageBarWrapper: {
    height: 15,
    backgroundColor: COLORS.card,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageBar: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  languagePercentage: {
    position: 'absolute',
    right: 5,
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  }
});
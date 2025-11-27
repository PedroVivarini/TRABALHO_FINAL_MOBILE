import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#F8F9FA', 
  primary: '#4CAF50', 
  secondary: '#FFC107', 
  text: '#212529', 
  textSecondary: '#6C757D', 
  cardBackground: '#FFFFFF', 
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    marginTop: 10,
  },
  metricCard: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  metricTitle: {
    fontSize: 16,
    color: COLORS.cardBackground,
    opacity: 0.8,
  },
  metricValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.cardBackground,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    marginTop: 10,
  },
  detailCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },

  progressBarContainer: {
    height: 10,
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
});
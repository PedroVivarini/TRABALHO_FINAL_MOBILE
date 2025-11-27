import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  introTitleHighlight: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#a78bfa',
    textAlign: 'center',
    marginBottom: 12,
  },
  introSubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  motivationalBox: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
  motivationalText: {
    fontSize: 14,
    color: '#a78bfa',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  searchBox: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },

  weatherCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  weatherBackground: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherImage: {
    resizeMode: 'cover',
  },
  weatherOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  weatherDate: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  weatherTemp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  weatherLocation: {
    fontSize: 8,
    color: '#fff',
    marginTop: 2,
    fontWeight: '200',
    textAlign: 'center',
  },
  weatherDesc: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 2,
    textTransform: 'capitalize',
    textAlign: 'center',
  },

  beneficioCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  beneficioLinha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  beneficioEmoji: {
    fontSize: 32,
  },
  beneficioTexto: {
    flex: 1,
    marginLeft: 12,
  },
  beneficioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  beneficioDescricao: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },

  sectionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },

  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a78bfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },

  habitoEssencialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  habitoEssencialEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  habitoEssencialTexto: {
    fontSize: 14,
    color: '#ddd',
    flex: 1,
  },

  splashContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 240,
    height: 240,
    marginBottom: 20,
    borderRadius: 90,
  },
  splashTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  offlineBanner: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  offlineText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

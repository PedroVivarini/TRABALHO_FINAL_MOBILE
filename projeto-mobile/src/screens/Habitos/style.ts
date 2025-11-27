import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ROXO_DESTAQUE = '#B39DDB';
const VERDE_CONCLUSAO = '#A5D6A7';
const AMARELO_HUMOR = '#FFD180';

export const estilos = StyleSheet.create({
    telaPrincipal: {
        flex: 1,
        backgroundColor: '#1a1a1a', 
    },
    containerScroll: {
        padding: 20,
        paddingBottom: 100, 
    },
    tituloPagina: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    dataSubtitulo: {
        fontSize: 16,
        color: ROXO_DESTAQUE, 
        marginBottom: 20,
    },
    barraSemanal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        backgroundColor: '#262626',
        borderRadius: 12,
        padding: 5,
    },
    itemDiaSemanal: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (width - 60) / 7, 
        height: 60, 
        borderRadius: 10,
        marginHorizontal: 1,
        backgroundColor: '#333333',
        paddingVertical: 10, 
    },
    diaSemanalSelecionado: {
        backgroundColor: ROXO_DESTAQUE, 
    },
    diaSemanalHoje: {
        borderColor: ROXO_DESTAQUE, 
        borderWidth: 1.5, 
    },
    diaSemanalComConclusao: {
        backgroundColor: VERDE_CONCLUSAO, 
    },
    diaSemanalComHumor: {
        backgroundColor: AMARELO_HUMOR, 
    },
    numeroDiaSemanal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    textoDiaSemanalSelecionado: {
        color: '#1a1a1a', 
    },
    subtituloSecao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 15,
    },
    areaHumores: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    emoji: {
        fontSize: 36,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#333333',
        opacity: 0.6,
    },
    emojiSelecionado: {
        opacity: 1,
        backgroundColor: '#444444',
        borderWidth: 2,
        borderColor: ROXO_DESTAQUE, 
    },
    cartaoHabito: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        minHeight: 60,
    },
    areaTextoHabito: {
        flex: 1,
        marginRight: 10,
    },
    textoHabito: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tagTipo: {
        fontSize: 12,
        color: '#FFFFFFCC', 
    },
    iconeChecagem: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        borderWidth: 2,
        borderColor: '#FFFFFF', 
    },
    iconeAcaoChecado: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 22, 
    },
    iconeEdicaoLimpo: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.1)', 
    },
    textoIconeEdicao: {
        fontSize: 16,
        opacity: 0.8,
        color: ROXO_DESTAQUE, 
        lineHeight: 18, 
        fontWeight: 'bold',
    },
    textoVazioLista: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 20,
    },
    botaoAdicionarHabito: {
        backgroundColor: ROXO_DESTAQUE, 
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
    },
    textoBotaoAdicionarHabito: {
        color: '#1a1a1a',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fundoModalHabito: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    areaModalOpcoes: {
        backgroundColor: '#262626',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
        maxHeight: '60%',
    },
    areaModalHabito: {
        backgroundColor: '#262626',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25,
        maxHeight: '85%', 
    },
    tituloModalHabito: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    botaoOpcaoModal: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    textoOpcaoModal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    subTextoOpcaoModal: {
        fontSize: 12,
        color: '#AAAAAA',
    },
    setaOpcaoModal: {
        fontSize: 20,
        color: '#AAAAAA',
        marginLeft: 15,
    },
    botaoCancelarModalOpcao: {
        marginTop: 10,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#333333',
    },
    inputHabito: {
        backgroundColor: '#333333',
        color: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#555555',
    },
    itemDetalheModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    textoDetalheModal: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
    },
    textoValorModal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ROXO_DESTAQUE, 
    },
    subtituloCor: {
        fontSize: 14,
        color: '#FFFFFF',
        marginBottom: 10,
        fontWeight: '600',
    },
    areaSelecaoCor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        flexWrap: 'wrap',
    },
    amostraCor: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
    },
    amostraCorSelecionada: {
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    areaBotoesModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    botaoModal: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    botaoCancelar: {
        backgroundColor: '#555555',
    },
    botaoConfirmar: {
        backgroundColor: ROXO_DESTAQUE, 
    },
    textoBotaoModal: {
        color: '#1a1a1a', 
        fontWeight: 'bold',
        fontSize: 16,
    },
    botaoExcluirModal: {
        backgroundColor: '#333333', 
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        borderWidth: 1,
        borderColor: ROXO_DESTAQUE, 
    },
    textoBotaoModalExcluir: {
        color: ROXO_DESTAQUE, 
        fontWeight: 'bold',
        fontSize: 16,
    },
    fundoModalCalendario: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    areaModalCalendario: {
        backgroundColor: '#262626',
        borderRadius: 20,
        padding: 20,
        width: '90%',
    },
    cabecalhoCalendarioModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconeNavegacaoMes: {
        fontSize: 24,
        color: ROXO_DESTAQUE, 
        paddingHorizontal: 10,
    },
    textoMesAno: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    containerDiasSemana: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 4,
    },
    textoDiaSemanaModal: {
        width: (width * 0.9 - 40) / 7,
        textAlign: 'center',
        color: '#AAAAAA',
        fontWeight: 'bold',
    },
    containerDiasMes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemDiaMes: {
        width: (width * 0.9 - 40) / 7, 
        height: (width * 0.9 - 40) / 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 4,
        backgroundColor: '#333333',
    },
    diaOutroMes: {
        backgroundColor: '#2C2C2C',
        opacity: 0.6,
    },
    textoDiaMes: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    diaMesSelecionado: {
        backgroundColor: ROXO_DESTAQUE, 
    },
    textoDiaMesSelecionado: {
        color: '#1a1a1a', 
        fontWeight: 'bold',
    },
    diaMesConclusao: {
        backgroundColor: VERDE_CONCLUSAO, 
    },
    diaMesHumor: {
        backgroundColor: AMARELO_HUMOR, 
    },
    areaBotoesModalCalendario: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    botaoAcaoCalendario: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginLeft: 10,
        alignItems: 'center',
    },
    botaoFecharCalendario: {
        backgroundColor: '#555555',
    },
    botaoHojeCalendario: {
        backgroundColor: ROXO_DESTAQUE,
    },
    textoBotaoCalendario: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
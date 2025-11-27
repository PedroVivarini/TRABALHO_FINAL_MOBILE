import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    Alert,
    Modal,
    StyleProp,
    ViewStyle,
    TextStyle,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { estilos } from "./style";
import {
    format,
    addDays,
    startOfWeek,
    eachDayOfInterval,
    addMonths,
    subMonths,
    isToday,
    isBefore,
    isEqual,
    endOfMonth,
    startOfMonth,
    parseISO
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Locale } from 'date-fns';

interface Habito {
    id: string;
    titulo: string;
    cor: string;
    dia: string;
    humor: string;
    isPendente: boolean;
    conclusoes: string[];
}

interface MoodsPorDia {
    [date: string]: number | null;
}

const CHAVE_STORAGE = '@HabitosApp:lista';
const CHAVE_MOODS = '@HabitosApp:moods';

const listaEmojis = [
    { emoji: '😞', nome: 'Péssimo' },
    { emoji: '🙁', nome: 'Ruim' },
    { emoji: '😐', nome: 'Neutro' },
    { emoji: '🙂', nome: 'Bom' },
    { emoji: '😄', nome: 'Excelente' },
];

const diasDaSemanaAbrev = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const coresCartoes: string[] = [
    '#FF8A8A', '#FFD180', '#80E0FF', '#B39DDB', '#A5D6A7', '#FF80AB'
];

const gerarDiasDaSemana = (dataInicial: Date) => {
    const dias = [];
    const options: { locale?: Locale, weekStartsOn: 0 } = { locale: ptBR, weekStartsOn: 0 };
    const inicioSemana = startOfWeek(dataInicial, options);

    for (let i = 0; i < 7; i++) {
        const data = addDays(inicioSemana, i);
        const dataString = format(data, 'yyyy-MM-dd');

        dias.push({
            dataObj: data,
            dataString: dataString,
            diaAbrev: format(data, 'EEE', options),
            numeroDia: format(data, 'd'),
        });
    }
    return dias;
};

const gerarDiasDoMes = (dataMes: Date) => {
    const options: { locale?: Locale, weekStartsOn: 0 } = { locale: ptBR, weekStartsOn: 0 };

    const inicioMes = startOfMonth(dataMes);
    const inicio = startOfWeek(inicioMes, options);

    const fimMes = endOfMonth(dataMes);
    const fim = addDays(startOfWeek(addDays(fimMes, 7), options), -1);

    const diasIntervalo = eachDayOfInterval({ start: inicio, end: fim });

    const diasFormatados = diasIntervalo.map(data => ({
        dataObj: data,
        dataString: format(data, 'yyyy-MM-dd'),
        numeroDia: format(data, 'd'),
        isCurrentMonth: format(data, 'MM') === format(dataMes, 'MM'),
    }));
    return diasFormatados;
};

export default function RastreamentoHabitos() {
    const hoje = new Date();
    const hojeString = format(hoje, 'yyyy-MM-dd');

    const [diaSelecionado, setDiaSelecionado] = useState(hojeString);
    const [humorSelecionado, setHumorSelecionado] = useState<number | null>(null);
    const [textoInput, setTextoInput] = useState("");
    const [corSelecionada, setCorSelecionada] = useState<string>('');
    const [listaHabitos, setListaHabitos] = useState<Habito[]>([]);
    const [habitoEditando, setHabitoEditando] = useState<Habito | null>(null);
    const [dataReferenciaSemanal, setDataReferenciaSemanal] = useState(hoje);
    const [modalHabitoVisivel, setModalHabitoVisivel] = useState(false);
    const [modalCalendarioVisivel, setModalCalendarioVisivel] = useState(false);
    const [mesAtualCalendario, setMesAtualCalendario] = useState(hoje);
    const [modalOpcoesVisivel, setModalOpcoesVisivel] = useState(false);
    const [isPendente, setIsPendente] = useState(false);

    const [moodsPorDia, setMoodsPorDia] = useState<MoodsPorDia>({});

    const gerarId = () => Math.random().toString(36).substring(2, 9);

    const salvarHabitos = async (habitos: Habito[]) => {
        try {
            const jsonValue = JSON.stringify(habitos);
            await AsyncStorage.setItem(CHAVE_STORAGE, jsonValue);
        } catch (e) {
            console.error("Erro ao salvar hábitos", e);
        }
    };

    const carregarHabitos = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(CHAVE_STORAGE);
            if (jsonValue != null) {
                const loadedHabitos: Habito[] = JSON.parse(jsonValue).map((h: any) => ({
                    ...h,
                    isPendente: h.isPendente === undefined ? false : h.isPendente,
                    conclusoes: Array.isArray(h.conclusoes)
                        ? h.conclusoes
                        : (h.dataConclusao ? [h.dataConclusao] : []),
                })).filter((h: Habito) => h.titulo);
                setListaHabitos(loadedHabitos);
            }
        } catch (e) {
            console.error("Erro ao carregar hábitos", e);
        }
    };

    const salvarMoods = async (moods: MoodsPorDia) => {
        try {
            const jsonValue = JSON.stringify(moods);
            await AsyncStorage.setItem(CHAVE_MOODS, jsonValue);
        } catch (e) {
            console.error("Erro ao salvar humor", e);
        }
    };

    const carregarMoods = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(CHAVE_MOODS);
            if (jsonValue != null) {
                setMoodsPorDia(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error("Erro ao carregar humor", e);
        }
    };

    useEffect(() => {
        carregarHabitos();
        carregarMoods();
    }, []);

    useEffect(() => {
        if (listaHabitos.length > 0 || listaHabitos.length === 0) {
            salvarHabitos(listaHabitos);
        }
    }, [listaHabitos]);

    useEffect(() => {
        salvarMoods(moodsPorDia);
    }, [moodsPorDia]);

    useEffect(() => {
        const humorDoDia = moodsPorDia[diaSelecionado] !== undefined ? moodsPorDia[diaSelecionado] : null;
        setHumorSelecionado(humorDoDia);
    }, [diaSelecionado, moodsPorDia]);

    const salvarHabito = () => {
        if (!textoInput.trim() || !corSelecionada) {
            Alert.alert("Erro", "Preencha o título e selecione uma cor.");
            return;
        }

        const novoHabito: Habito = {
            id: habitoEditando ? habitoEditando.id : gerarId(),
            titulo: textoInput.trim(),
            cor: corSelecionada,
            dia: habitoEditando ? habitoEditando.dia : diaSelecionado,
            humor: '',
            conclusoes: habitoEditando ? habitoEditando.conclusoes : [],
            isPendente: isPendente,
        };

        setListaHabitos(prevLista => {
            if (habitoEditando) {
                return prevLista.map(h => h.id === novoHabito.id ? novoHabito : h);
            } else {
                return [...prevLista, novoHabito];
            }
        });

        setModalHabitoVisivel(false);
        setTextoInput('');
        setCorSelecionada('');
        setHabitoEditando(null);
        setIsPendente(false);
    };

    const abrirModalHabito = (habito?: Habito, isRecorrente: boolean = false) => {
        setHabitoEditando(habito || null);
        setTextoInput(habito ? habito.titulo : "");
        setCorSelecionada(habito ? habito.cor : coresCartoes[0] || '');

        setIsPendente(habito ? habito.isPendente : isRecorrente);

        setModalHabitoVisivel(true);
        setModalOpcoesVisivel(false);
    };

    const abrirSelecaoTipo = () => {
        setHabitoEditando(null);
        setTextoInput('');
        setCorSelecionada(coresCartoes[0]);
        setModalOpcoesVisivel(true);
    };

    const registrarHumor = (index: number | null) => {
        const novoHumor = index === humorSelecionado ? null : index;

        setHumorSelecionado(novoHumor);

        setMoodsPorDia(prevMoods => ({
            ...prevMoods,
            [diaSelecionado]: novoHumor,
        }));
    };

    const isConcluidoNoDia = (h: Habito, diaSelecionado: string): boolean => {
        return h.conclusoes.includes(diaSelecionado);
    };

    const alternarConclusao = (id: string) => {
        setListaHabitos(prevLista => prevLista.map(h => {
            if (h.id === id) {
                const isConcluido = isConcluidoNoDia(h, diaSelecionado);
                let novasConclusoes = [...h.conclusoes];

                if (isConcluido) {
                    novasConclusoes = novasConclusoes.filter(d => d !== diaSelecionado);
                } else {
                    if (isBefore(parseISO(diaSelecionado), hoje) || isEqual(parseISO(diaSelecionado), hoje)) {
                        novasConclusoes.push(diaSelecionado);
                    }
                }

                return { ...h, conclusoes: novasConclusoes };
            }
            return h;
        }));
    };

    const removerHabito = (id: string) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja remover esta tarefa?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    onPress: () => {
                        setListaHabitos(listaHabitos.filter(h => h.id !== id));
                        setModalHabitoVisivel(false);
                        setHabitoEditando(null);
                    },
                    style: "destructive"
                },
            ]
        );
    };

    const irParaMesAnterior = () => {
        setMesAtualCalendario(subMonths(mesAtualCalendario, 1));
    };

    const irParaProximoMes = () => {
        setMesAtualCalendario(addMonths(mesAtualCalendario, 1));
    };

    const selecionarDiaNoModal = (dataString: string) => {
        const novaData = parseISO(dataString);
        setDiaSelecionado(dataString);
        setDataReferenciaSemanal(novaData);
        setMesAtualCalendario(novaData);
        setModalCalendarioVisivel(false);
    };

    const irParaHojeNoModal = () => {
        setMesAtualCalendario(hoje);
        selecionarDiaNoModal(hojeString);
    };

    const dataSelecionadaObj = parseISO(diaSelecionado);

    const isHabitoVisivelNoDia = (h: Habito) => {
        const dataHabitoObj = parseISO(h.dia);

        const isHabitoDiaOuAnterior = isBefore(dataHabitoObj, dataSelecionadaObj) || isEqual(dataHabitoObj, dataSelecionadaObj);

        const isOneTimeTaskForToday = !h.isPendente && h.dia === diaSelecionado;

        const isRecurringTaskVisible = h.isPendente && isHabitoDiaOuAnterior;

        return isOneTimeTaskForToday || isRecurringTaskVisible;
    };

    const habitosAFazer = listaHabitos.filter(h =>
        isHabitoVisivelNoDia(h) && !isConcluidoNoDia(h, diaSelecionado)
    );

    const habitosConcluidos = listaHabitos.filter(h =>
        isHabitoVisivelNoDia(h) && isConcluidoNoDia(h, diaSelecionado)
    );

    const ItemDiaSemanal = ({ item }: any) => {
        const isSelected = item.dataString === diaSelecionado;
        const isTodayItem = isToday(item.dataObj);

        const isHabitoConcluidoAlgum = listaHabitos.some(h =>
            isHabitoVisivelNoDia({ ...h, dia: item.dataString, conclusoes: h.conclusoes }) && isConcluidoNoDia(h, item.dataString)
        );

        const humorRegistrado = moodsPorDia[item.dataString] !== undefined && moodsPorDia[item.dataString] !== null;

        let estiloBase: StyleProp<ViewStyle> = estilos.itemDiaSemanal;
        let estiloNumeroDia: StyleProp<TextStyle> = estilos.numeroDiaSemanal;

        if (isSelected) {
            estiloBase = [estilos.itemDiaSemanal, estilos.diaSemanalSelecionado];
            estiloNumeroDia = [estilos.numeroDiaSemanal, estilos.textoDiaSemanalSelecionado];
        } else if (isTodayItem) {
            estiloBase = [estilos.itemDiaSemanal, estilos.diaSemanalHoje];
        } else if (isHabitoConcluidoAlgum) {
            estiloBase = [estilos.itemDiaSemanal, estilos.diaSemanalComConclusao];
        } else if (humorRegistrado) {
            estiloBase = [estilos.itemDiaSemanal, estilos.diaSemanalComHumor];
        }


        return (
            <TouchableOpacity
                style={estiloBase}
                onPress={() => setDiaSelecionado(item.dataString)}
            >
                <Text style={estiloNumeroDia}>
                    {item.numeroDia}
                </Text>
            </TouchableOpacity>
        );
    };

    const CalendarioSemanal = () => {
        const diasDaSemana = gerarDiasDaSemana(dataReferenciaSemanal);

        return (
            <View style={estilos.barraSemanal}>
                <FlatList
                    data={diasDaSemana}
                    keyExtractor={(item) => item.dataString}
                    renderItem={ItemDiaSemanal}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
                />
            </View>
        );
    };

    const renderizarHabito = ({ item }: { item: Habito }) => {
        const isConcluido = isConcluidoNoDia(item, diaSelecionado);

        const tagTipo = item.isPendente ? 'Hábito' : 'Tarefa';

        return (
            <View style={[estilos.cartaoHabito, { backgroundColor: item.cor }]}>

                <View style={estilos.areaTextoHabito}>
                    <Text
                        style={[
                            estilos.textoHabito,
                            isConcluido && { textDecorationLine: 'line-through', color: '#FFFFFF80' }
                        ]}
                    >
                        {item.titulo}
                    </Text>
                    <Text style={estilos.tagTipo}>{tagTipo}</Text>
                </View>

                <TouchableOpacity
                    style={[estilos.iconeChecagem, { backgroundColor: isConcluido ? '#FFFFFF' : item.cor }]}
                    onPress={() => alternarConclusao(item.id)}
                >
                    {isConcluido && (
                        <Text style={[estilos.iconeAcaoChecado, { color: '#1a1a1a' }]}>✓</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={estilos.iconeEdicaoLimpo}
                    onPress={() => abrirModalHabito(item)}
                >
                    <Text style={estilos.textoIconeEdicao}>⋮</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const nomeDiaDaSemana = format(dataSelecionadaObj, 'EEEE', { locale: ptBR })
        .replace(/^./, (c) => c.toUpperCase());

    const dataFormatadaSubtitulo = format(parseISO(diaSelecionado), 'MMMM d, yyyy', { locale: ptBR })
        .replace(/^./, (c) => c.toUpperCase());


    return (
        <View style={estilos.telaPrincipal}>
            <ScrollView contentContainerStyle={estilos.containerScroll} showsVerticalScrollIndicator={false}>

                <Text style={estilos.tituloPagina}>{nomeDiaDaSemana}.</Text>

                <TouchableOpacity onPress={() => setModalCalendarioVisivel(true)}>
                    <Text style={estilos.dataSubtitulo}>
                        {dataFormatadaSubtitulo}
                    </Text>
                </TouchableOpacity>

                <CalendarioSemanal />

                <Text style={estilos.subtituloSecao}>Como você está se sentindo?</Text>
                <View style={estilos.areaHumores}>
                    {listaEmojis.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => registrarHumor(index)}
                        >
                            <Text
                                style={[
                                    estilos.emoji,
                                    humorSelecionado === index && estilos.emojiSelecionado
                                ]}
                            >
                                {item.emoji}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={estilos.subtituloSecao}>Hábitos/Tarefas</Text>
                <FlatList
                    data={habitosAFazer}
                    keyExtractor={(item) => item.id}
                    renderItem={renderizarHabito}
                    scrollEnabled={false}
                    ListEmptyComponent={() => (
                        <Text style={estilos.textoVazioLista}>
                            Nenhuma tarefa pendente para este dia.
                        </Text>
                    )}
                />

                <Text style={estilos.subtituloSecao}>Concluído</Text>
                <FlatList
                    data={habitosConcluidos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderizarHabito}
                    scrollEnabled={false}
                    ListEmptyComponent={() => (
                        <Text style={estilos.textoVazioLista}>
                            Nenhuma tarefa concluída.
                        </Text>
                    )}
                />

                <TouchableOpacity
                    style={estilos.botaoAdicionarHabito}
                    activeOpacity={0.8}
                    onPress={abrirSelecaoTipo}
                >
                    <Text style={estilos.textoBotaoAdicionarHabito}>Adicionar Nova Tarefa</Text>
                </TouchableOpacity>

            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalOpcoesVisivel}
                onRequestClose={() => setModalOpcoesVisivel(false)}
            >
                <View style={estilos.fundoModalHabito}>
                    <View style={estilos.areaModalOpcoes}>
                        <Text style={estilos.tituloModalHabito}>O que você deseja adicionar?</Text>

                        <TouchableOpacity
                            style={estilos.botaoOpcaoModal}
                            onPress={() => abrirModalHabito(undefined, true)}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={estilos.textoOpcaoModal}>Hábito</Text>
                                <Text style={estilos.subTextoOpcaoModal}>Atividade que se repete ao longo do tempo. Possui rastreamento e estatísticas.</Text>
                            </View>
                            <Text style={estilos.setaOpcaoModal}>{'>'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={estilos.botaoOpcaoModal}
                            onPress={() => abrirModalHabito(undefined, false)}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={estilos.textoOpcaoModal}>Tarefa</Text>
                                <Text style={estilos.subTextoOpcaoModal}>Atividade de instância única sem rastreamento ao longo do tempo.</Text>
                            </View>
                            <Text style={estilos.setaOpcaoModal}>{'>'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[estilos.botaoCancelarModalOpcao]}
                            onPress={() => setModalOpcoesVisivel(false)}
                        >
                            <Text style={estilos.textoBotaoModal}>FECHAR</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalHabitoVisivel}
                onRequestClose={() => setModalHabitoVisivel(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={estilos.fundoModalHabito}
                >
                    <View style={estilos.areaModalHabito}>
                        <Text style={estilos.tituloModalHabito}>
                            {habitoEditando ? "Editar Tarefa" : "Nova Tarefa"}
                        </Text>

                        <View style={[estilos.itemDetalheModal, { borderBottomWidth: 0, marginBottom: 10, paddingVertical: 5 }]}>
                            <Text style={[estilos.textoDetalheModal, { fontWeight: 'bold' }]}>Tipo:</Text>
                            <Text style={estilos.textoValorModal}>{isPendente ? 'Hábito Diário' : 'Tarefa Única'}</Text>
                        </View>

                        <TextInput
                            style={estilos.inputHabito}
                            placeholder="Nome da Tarefa"
                            placeholderTextColor="#AAA"
                            value={textoInput}
                            onChangeText={setTextoInput}
                            maxLength={50}
                        />

                        <View style={[estilos.itemDetalheModal, { borderBottomWidth: 0 }]}>
                            <Text style={[estilos.textoDetalheModal, { fontWeight: 'bold' }]}>Data de Início:</Text>
                            <Text style={estilos.textoValorModal}>{format(parseISO(habitoEditando ? habitoEditando.dia : diaSelecionado), 'MMM d, yyyy', { locale: ptBR })}</Text>
                        </View>

                        <Text style={[estilos.subtituloCor, { marginTop: 20 }]}>Selecione uma cor:</Text>
                        <View style={estilos.areaSelecaoCor}>
                            {coresCartoes.map((cor, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        estilos.amostraCor,
                                        { backgroundColor: cor },
                                        corSelecionada === cor && estilos.amostraCorSelecionada,
                                    ]}
                                    onPress={() => setCorSelecionada(cor)}
                                />
                            ))}
                        </View>

                        <View style={estilos.areaBotoesModal}>
                            <TouchableOpacity
                                style={[estilos.botaoModal, estilos.botaoCancelar]}
                                onPress={() => setModalHabitoVisivel(false)}
                            >
                                <Text style={estilos.textoBotaoModal}>CANCELAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[estilos.botaoModal, estilos.botaoConfirmar]}
                                onPress={salvarHabito}
                            >
                                <Text style={estilos.textoBotaoModal}>CONFIRMAR</Text>
                            </TouchableOpacity>
                        </View>

                        {habitoEditando && (
                            <TouchableOpacity
                                style={estilos.botaoExcluirModal}
                                onPress={() => removerHabito(habitoEditando.id)}
                            >
                                <Text style={estilos.textoBotaoModalExcluir}>EXCLUIR TAREFA</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCalendarioVisivel}
                onRequestClose={() => setModalCalendarioVisivel(false)}
            >
                <View style={estilos.fundoModalCalendario}>
                    <View style={estilos.areaModalCalendario}>

                        <View style={estilos.cabecalhoCalendarioModal}>
                            <TouchableOpacity onPress={irParaMesAnterior}>
                                <Text style={estilos.iconeNavegacaoMes}>{'<'}</Text>
                            </TouchableOpacity>

                            <Text style={estilos.textoMesAno}>
                                {format(mesAtualCalendario, 'MMMM yyyy', { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase())}
                            </Text>

                            <TouchableOpacity onPress={irParaProximoMes}>
                                <Text style={estilos.iconeNavegacaoMes}>{'>'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={estilos.containerDiasSemana}>
                            {diasDaSemanaAbrev.map((dia, index) => (
                                <Text key={index} style={estilos.textoDiaSemanaModal}>
                                    {dia}
                                </Text>
                            ))}
                        </View>

                        <View style={estilos.containerDiasMes}>
                            {gerarDiasDoMes(mesAtualCalendario).map((dia, index) => {
                                const isSelected = dia.dataString === diaSelecionado;
                                const isDiaAtual = isToday(dia.dataObj);

                                const isHabitoConcluidoAlgum = listaHabitos.some(h =>
                                    isHabitoVisivelNoDia({ ...h, dia: dia.dataString, conclusoes: h.conclusoes }) && isConcluidoNoDia(h, dia.dataString)
                                );
                                const humorRegistrado = moodsPorDia[dia.dataString] !== undefined && moodsPorDia[dia.dataString] !== null;


                                let estiloDia: StyleProp<ViewStyle> = estilos.itemDiaMes;
                                let estiloTextoDia: StyleProp<TextStyle> = estilos.textoDiaMes;

                                if (!dia.isCurrentMonth) {
                                    estiloDia = [estilos.itemDiaMes, estilos.diaOutroMes];
                                    estiloTextoDia = [estilos.textoDiaMes, estilos.diaOutroMes];
                                }

                                if (isHabitoConcluidoAlgum) {
                                    estiloDia = [estilos.itemDiaMes, estilos.diaMesConclusao];
                                } else if (humorRegistrado) {
                                    estiloDia = [estilos.itemDiaMes, estilos.diaMesHumor];
                                }

                                if (isSelected) {
                                    estiloDia = [estilos.itemDiaMes, estilos.diaMesSelecionado];
                                    estiloTextoDia = [estilos.textoDiaMes, estilos.textoDiaMesSelecionado];
                                } else if (isDiaAtual) {
                                    estiloDia = [estiloDia, { borderColor: '#B39DDB', borderWidth: 1 }];
                                }

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={estiloDia}
                                        onPress={() => selecionarDiaNoModal(dia.dataString)}
                                    >
                                        <Text style={estiloTextoDia}>
                                            {dia.numeroDia}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <View style={estilos.areaBotoesModalCalendario}>
                            <TouchableOpacity
                                style={[estilos.botaoAcaoCalendario, estilos.botaoFecharCalendario]}
                                onPress={() => setModalCalendarioVisivel(false)}
                            >
                                <Text style={estilos.textoBotaoCalendario}>FECHAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}
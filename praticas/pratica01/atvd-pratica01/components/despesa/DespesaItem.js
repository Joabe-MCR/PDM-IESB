import { Pressable, StyleSheet, Text, View } from 'react-native';

function getDataFormatada(data) {
  return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem(itemData) {
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <View style={styles.itemText}>
          <Text>{getDataFormatada(itemData.item.data)}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>{itemData.item.descricao}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>R$ {itemData.item.valor}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
  },
  itemText: {
    flex: 1,
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
    alignContent: 'left',
  },
});

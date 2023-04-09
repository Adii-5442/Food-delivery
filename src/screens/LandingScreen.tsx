import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
const screenWidth = Dimensions.get("screen").width

const LandingScreen = () => {
    const [location, setlocation] = useState({});
    const [error, seterror] = useState<unknown | null>(null)
    const [address, setaddress] = useState("")
    const [showAddress, setshowAddress] = useState("")
    const [showLocation, setShowLocation] = useState('Waiting for Current Location ...');

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }

                let location = await Location.getCurrentPositionAsync({});

                const { coords } = location

                if (coords) {
                    const { latitude, longitude } = coords;

                    let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude })


                    for (const [key, value] of addressResponse.entries()) {
                        console.log(key, value);
                    }
                    for (let item of addressResponse) {

                        setlocation(item)
                        let currentAddress = ` At ${item.name} ${item.street} ${item.postalCode} ${item.country}`

                        console.log(`\x1b[46m ${item} \x1b[0m`);
                        setShowLocation(currentAddress)
                        return;

                    }
                }
            } catch (error) {
                seterror((error as Error).message);
                setShowLocation((error as Error).message);
            }
        })();
    }, []);










    return (
        <View style={styles.container}>
            <View style={styles.navigation}>

            </View>
            <View style={styles.body}>
                <Image source={require('../images/Deliver.png')} style={styles.deliverIcon} />
                <View style={styles.addressContainer}>
                    <Text style={styles.commonText}>Your Delivery Address</Text>
                </View>
                <Text style={styles.commonText2}>{showLocation}</Text>
            </View>
            <View style={styles.footer}>

            </View>


        </View>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    navigation: {
        flex: 2,
        backgroundColor: '#000000',
    },
    addressContainer: {
        width: screenWidth - 500,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center'

    },
    commonText: {
        color: '#ffffff',
        fontSize: 20,
        marginTop: 10
    }, commonText2: {
        color: '#fff8',
        fontSize: 20,
        marginTop: 10
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    footer: {
        flex: 1,
        backgroundColor: '#000000'
    },
    deliverIcon: {
        width: 150,
        height: 150,
    }

})
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Changed to FontAwesome5

// Define valid FontAwesome 5 Free icon names
type IconName =
    | 'box-open'       // Updated to FontAwesome 5 equivalent for 'cube'
    | 'id-card'
    | 'map-marker-alt' // Updated to FontAwesome 5 equivalent
    | 'credit-card'
    | 'ticket-alt'
    | 'bell'
    | 'question-circle'
    | 'info-circle'
    | 'store'
    | 'search'
    | 'shopping-cart'
    | 'heart'
    | 'user'
    | 'pencil-alt'
    | 'angle-right'
    | 'sign-out-alt'   // Updated to FontAwesome 5 equivalent
    | 'signal'
    | 'wifi'
    | 'battery-full';

interface MenuItem {
    label: string;
    icon: IconName;
}

interface BottomNavItem {
    label: string;
    icon: IconName;
    active: boolean;
}

const ProfileScreen: React.FC = () => {
    return (
        <View style={styles.container}>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <View style={styles.profileNameContainer}>
                        <Text style={styles.profileName}>Afsar Hossen</Text>
                        <FontAwesome5 name="pencil-alt" size={16} style={styles.editIcon} />
                    </View>
                    <Text style={styles.profileEmail}>lmshuvo97@gmail.com</Text>
                </View>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.menuItems}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <FontAwesome5 name={item.icon} size={20} />
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </View>
                        <FontAwesome5 name="angle-right" size={20} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Log Out Button */}
            <TouchableOpacity style={styles.logoutButton}>
                <FontAwesome5 name="sign-out-alt" size={20} color="green" />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const menuItems: MenuItem[] = [
    { label: 'Orders', icon: 'box-open' },         // Changed from 'cube'
    { label: 'My Details', icon: 'id-card' },
    { label: 'Delivery Address', icon: 'map-marker-alt' }, // Changed from 'map-marker'
    { label: 'Payment Methods', icon: 'credit-card' },
    { label: 'Promo Cord', icon: 'ticket-alt' },
    { label: 'Notifications', icon: 'bell' },
    { label: 'Help', icon: 'question-circle' },
    { label: 'About', icon: 'info-circle' },
];

const bottomNavItems: BottomNavItem[] = [
    { label: 'Shop', icon: 'store', active: false },
    { label: 'Explore', icon: 'search', active: false },
    { label: 'Cart', icon: 'shopping-cart', active: false },
    { label: 'Favourite', icon: 'heart', active: false },
    { label: 'Account', icon: 'user', active: true },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    time: {
        fontSize: 16,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    profileInfo: {
        marginLeft: 16,
    },
    profileNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editIcon: {
        marginLeft: 8,
    },
    profileEmail: {
        color: 'gray',
    },
    menuItems: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        marginLeft: 16,
        fontSize: 16,
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
        margin: 16,
        borderRadius: 8,
    },
    logoutText: {
        marginLeft: 8,
        color: 'green',
        fontSize: 16,
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
    },
    navTextActive: {
        color: 'green',
    },
});

export default ProfileScreen;
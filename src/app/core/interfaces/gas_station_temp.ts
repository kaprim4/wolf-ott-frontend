export interface GasStationTemp {
    id_bordereau: number;
    zztype_bon_temp: string;
    zznum_bon_temp: string;
    zznum_bord_temp: string;
    zzcode_barre_temp: string;
    zznum_vehicule_temp: string;
    zzdate_bon_temp: string;
    zzclient_temp: string;
    zzstation_prov_temp: string;
    zzid_port_bon_temp: string;
    zzposte_produit_temp: string;
    zzarticle_temp_temp: string;
    zzqte_produit_temp: string;
    zzmnt_unit_temp: string;
    zzmnt_produit_temp: string;
    zzmnt_vignette_temp: string;
    zzname_temp: string;
    zzlocalite_temp: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean;
}

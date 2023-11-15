export interface GasStationVoucher {
    id_bordereau: number;
    zztype_bon: string;
    zznum_bon: string;
    zznum_bord: string;
    zzcode_barre: string;
    zznum_vehicule: string;
    zzdate_bon: string;
    zzclient: string;
    zzstation_prov: string;
    zzid_port_bon: string;
    zzposte_produit: string;
    zzarticle: string;
    zzqte_produit: string;
    zzmnt_unit: string;
    zzmnt_produit: string;
    zzmnt_vignette: string;
    zzname: string;
    zzlocalite: string;
    flag: number;
    DATE_MAJ_INTRA: string;
    HEURE_MAJ_INTRA: string;

    [key: string]: string | number | boolean;
}

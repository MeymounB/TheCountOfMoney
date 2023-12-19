<template>
  <div class="flex justify-center my-5">
    <button class="btn btn-accent" @click="toggleSwitch">
      {{ isActive ? "Disconnected" : "Connected" }}
    </button>
  </div>

  <div v-show="isActive">
    <HomeHeroSection class="bg-base-100 text-base-content" />
    <HomeStatSection class="bg-primary text-primary-content" />
    <HomeChartDemoSection class="bg-base-100 text-base-content" />
    <HomeFeaturesDetailSection class="text-base-content" />
    <section
      class="bg-primary text-primary-content flex flex-col items-center justify-center gap-6 md:gap-10 px-6 lg:px-12 py-8 md:py-16 lg:py-24 xl:py-32"
    >
      <div class="mb-2 text-center lg:px-[5%]">
        <h2 class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-5">
          Votre Tableau de Bord Crypto Personnalisé : Suivez, Analysez,
          Optimisez
        </h2>
        <p>
          Gardez une longueur d'avance dans le monde de la cryptomonnaie avec
          notre tableau de bord personnalisé. Notre plateforme vous offre un
          aperçu complet de vos investissements, avec des outils d'analyse et de
          suivi en temps réel.
        </p>
      </div>
    </section>

    <section class="bg-base-100 text-base-content px-6 lg:px-12 py-24">
      <h2
        class="text-base-content w-full border-t border-solid border-base-content mb-12 sm:mb-20 text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold pt-4"
      >
        Sécurité et fiabilité
      </h2>
      <div class="flex flex-col sm:flex-row gap-10">
        <article
          class="w-full border border-solid border-base-content p-5 rounded-sm"
        >
          <div
            class="w-full border-b border-solid border-base-content pb-5 mb-2"
          >
            <h3 class="text-xl xl:text-2xl mb-2">Sécurité Inébranlable</h3>
            <p class="text-lg font-medium">Protégez Vos Données</p>
          </div>
          <ul>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />
              Protection Renforcée des Données
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />
              Surveillance Continue
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />
              Authentification Multifactorielle
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" /> Sauvegardes
              Régulières
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />
              Transparence et Conformité
            </li>
          </ul>
        </article>

        <article
          class="w-full border border-solid border-base-content p-5 rounded-sm"
        >
          <div
            class="w-full border-b border-solid border-base-content pb-5 mb-2"
          >
            <h3 class="text-xl xl:text-2xl mb-2">Fiabilité Infaillible</h3>
            <p class="text-lg font-medium">Votre Partenaire de Confiance</p>
          </div>
          <ul>
            <li class="flex items-center">
              <svg-icon
                class="h-5 w-5 mr-2"
                src="/"
                name="check"
              />Infrastructure Solide
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />Support
              Client Dédié
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />Mises à Jour
              Régulières
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />Partenariats
              Stratégiques
            </li>
            <li class="flex items-center">
              <svg-icon class="h-5 w-5 mr-2" src="/" name="check" />Engagement
              envers la Qualité
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section
      class="bg-primary text-primary-content flex flex-col px-6 lg:px-12 py-24"
    >
      <hr class="w-full border-t border-solid border-base-content" />
      <div class="flex flex-col lg:flex-row gap-5">
        <div>
          <h2
            class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light my-5"
          >
            Notre Communauté
          </h2>
          <p>
            Rejoignez une Communauté de Passionnés de Cryptomonnaie Faites
            partie d'une communauté dynamique de traders et d'investisseurs.
            Partagez vos expériences, obtenez des conseils, et restez connecté
            avec les dernières nouvelles du monde de la cryptomonnaie.
          </p>
        </div>
      </div>
    </section>
  </div>

  <div
    v-if="!isActive"
    class="px-6 lg:px-12 flex flex-col lg:flex-row lg:gap-[50px] h-full"
  >
    <section class="profil my-10 lg:px-5">
      <table
        class="table table-md text-left text-sm font-light overflow-hidden"
      >
        <tbody v-if="users.length > 0" v-for="user in users" :key="user.id">
          <tr>
            <th scope="row">Prénom</th>
            <td v-if="!user.editingFirstname">{{ user.firstname }}</td>
            <td v-else><input v-model="user.editedFirstname" /></td>
            <td class="flex flex-row-reverse gap-2">
              <svg-icon
                v-if="!user.editingFirstname"
                name="pen"
                class="h-5 w-5"
                @click="enableEditing(user, 'Firstname')"
              />
              <svg-icon
                v-else
                name="check"
                class="h-5 w-5"
                @click="saveChanges(user, 'Firstname')"
              />
              <svg-icon
                v-if="user.editingFirstname"
                name="cross"
                class="h-5 w-5"
                @click="cancelChanges(user, 'Firstname')"
              />
            </td>
          </tr>

          <tr>
            <th scope="row">Nom</th>
            <td v-if="!user.editingLastname">{{ user.lastname }}</td>
            <td v-else><input v-model="user.editedLastname" /></td>
            <td class="flex flex-row-reverse gap-2">
              <svg-icon
                v-if="!user.editingLastname"
                name="pen"
                class="h-5 w-5"
                @click="enableEditing(user, 'Lastname')"
              />
              <svg-icon
                v-else
                name="check"
                class="h-5 w-5"
                @click="saveChanges(user, 'Lastname')"
              />
              <svg-icon
                v-if="user.editingLastname"
                name="cross"
                class="h-5 w-5"
                @click="cancelChanges(user, 'Lastname')"
              />
            </td>
          </tr>

          <tr>
            <th scope="row">Email</th>
            <td v-if="!user.editingEmail">{{ user.email }}</td>
            <td v-else><input v-model="user.editedEmail" type="email" /></td>
            <td class="flex flex-row-reverse gap-2">
              <svg-icon
                v-if="!user.editingEmail"
                name="pen"
                class="h-5 w-5"
                @click="enableEditing(user, 'Email')"
              />
              <svg-icon
                v-else
                name="check"
                class="h-5 w-5"
                @click="saveChanges(user, 'Email')"
              />
              <svg-icon
                v-if="user.editingEmail"
                name="cross"
                class="h-5 w-5"
                @click="cancelChanges(user, 'Email')"
              />
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="99" class="text-center px-6 py-4">Aucune donnée</td>
          </tr>
        </tbody>
      </table>
    </section>

    <hr
      class="border border-solid border-gray-300 h-full align-middle hidden lg:inline-block"
    />

    <section class="flex w-full items-center justify-center lg:justify-start">
      <!-- <p>Module crypto favorite</p> -->
      <div class="overflow-x-auto border rounded-xl border-base-300">
        <UITable id="table" class="table" :table-data="dataTable">
          <template #name="data">
            <div class="flex items-center gap-4">
              <Star :crypto="data.data.name" />
              <NuxtLink
                :to="`/cryptocurrency/${data.data.symbol}`"
                class="flex items-center gap-2"
              >
                <img
                  :src="data.data.image_url"
                  alt="Crypto Icon"
                  class="h-6 w-6"
                />
                <span class="font-bold">{{ data.data.name }}</span>
                <span>{{ data.data.symbol }}</span>
              </NuxtLink>
            </div>
          </template>
          <template #price="data">
            <span class="font-bold">
              {{
                data.data.price && data.data.price.EUR
                  ? data.data.price.EUR.currentPrice.toFixed(2) + "€"
                  : "N/A"
              }}
            </span>
          </template>
          <template #last24hCandle="data">
            <span
              :class="
                getClass(
                  data.data.price && data.data.price.EUR
                    ? data.data.price.EUR.last24hCandle.changePercent
                    : 0
                )
              "
            >
              {{
                data.data.price && data.data.price.EUR
                  ? data.data.price.EUR.last24hCandle.changePercent.toFixed(2) +
                    "%"
                  : "N/A"
              }}
            </span>
          </template>
          <template #hourCandle="data">
            <span
              :class="
                getClass(
                  data.data.price && data.data.price.EUR
                    ? data.data.price.EUR.hourCandle.changePercent
                    : 0
                )
              "
            >
              {{
                data.data.price && data.data.price.EUR
                  ? data.data.price.EUR.hourCandle.changePercent.toFixed(2) +
                    "%"
                  : "N/A"
              }}
            </span>
          </template>
          <template #market_cap="data">
            {{
              data.data.price && data.data.price.EUR
                ? data.data.price.EUR.marketCap.toFixed(2) + "€"
                : "N/A"
            }}
          </template>
          <template #volume="data">
            {{
              data.data.price && data.data.price.EUR
                ? data.data.price.EUR.totalVolume.toFixed(2) + "€"
                : "N/A"
            }}
          </template>
        </UITable>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Frontend only (switch button)

const isActive = ref(false);

const toggleSwitch = () => {
  isActive.value = !isActive.value;
};

// Frontend only (modifications des infos en dur)

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  editingFirstname: boolean;
  editingLastname: boolean;
  editingEmail: boolean;
  editedFirstname?: string;
  editedLastname?: string;
  editedEmail?: string;
}

const users = ref<User[]>([
  {
    id: 1,
    firstname: "Alice",
    lastname: "Dupont",
    email: "alice@example.com",
    editingFirstname: false,
    editingLastname: false,
    editingEmail: false,
  },
]);

// Methods for editing

const enableEditing = (user: User, field: string) => {
  (user as any)[`editing${field}`] = true;
  (user as any)[`edited${field}`] = (user as any)[field.toLowerCase()];
};

const saveChanges = (user: User, field: string) => {
  const editedField = `edited${field}`;
  const editingField = `editing${field}`;
  if ((user as any)[editedField] !== undefined) {
    (user as any)[field.toLowerCase()] = (user as any)[editedField];
  }
  (user as any)[editingField] = false;
};

const cancelChanges = (user: User, field: string) => {
  (user as any)[`editing${field}`] = false;
};

// Crypto table

import type { UIDataTable } from "@timeismoney/ui-components/types/ui-table";
import { useFetchAPI } from "../composables/fetch";

const dataTable = ref<UIDataTable<any>>({
  heading: [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "last24hCandle", label: "24h %" },
    { key: "hourCandle", label: "Last Hour %" },
    { key: "market_cap", label: "Market Cap" },
    { key: "volume", label: "Volume" },
  ],
  data: [],
});

const getClass = (value) => {
  if (typeof value === "number") {
    return value < 0 ? "text-red-500 font-bold" : "text-green-500 font-bold";
  } else if (typeof value === "string") {
    return value.startsWith("-")
      ? "text-red-500 font-bold"
      : "text-green-500 font-bold";
  }
  return "";
};

const fetchCryptoData = async () => {
  const response = await useFetchAPI<any[]>("GET", "/cryptos/");
  if (response.ok) {
    const symbols = response.data.data.map((crypto) => crypto.symbol).join(",");
    const pricesResponse = await useFetchAPI<any>(
      "GET",
      `/cryptos/prices/?symbols=${symbols}`
    );
    if (pricesResponse.ok) {
      const pricesData = pricesResponse.data;
      const combinedData = response.data.data.map((crypto) => {
        return {
          ...crypto,
          price: pricesData[crypto.symbol],
        };
      });
      dataTable.value.data = combinedData;
      console.log(dataTable.value.data);
    }
  } else {
    alert("Failed fetching data");
  }
};

onMounted(async () => {
  fetchCryptoData();
});
</script>

<template>
  <div class="container">
    <div class="title flex column center-both">
      <p>Welcome to the one and only</p>
      <h1>Pizza Parallax!</h1>
    </div>
    <div class="order flex column">
      <h2>Choose from a wide selection of pizzas!</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga cumque
        iste dolore blanditiis? Commodi quae ipsam optio voluptate impedit
        suscipit, provident, voluptatibus totam animi earum cum iusto. Soluta,
        consectetur vitae?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde eum autem
        illum cumque aspernatur praesentium!
      </p>
      <NuxtLink to="menu" class="menu-btn flex center-both">
        <ButtonElement text="Order Pizza" />
      </NuxtLink>
    </div>
    <div class="booking">
      <h2>Book a table at the restaurant!</h2>
      <div class="booking-box flex justify-evenly align-center gap-1">
        <div class="input-container flex column">
          <div class="booking-date-box flex gap-1">
            <div class="input-box flex column">
              <label for="book-date">Select Date:</label>
              <input type="date" name="book-date" id="book-date" />
            </div>
            <div class="input-box flex column">
              <label for="book-time">Select Hour:</label>
              <input type="time" name="time" id="book-time" />
            </div>
          </div>
          <div class="input-box flex column">
            <label for="number-of-guests">For how many?</label>
            <input
              type="number"
              name="book-number-of-guests"
              id="book-number-of-guests"
            />
          </div>
          <div class="input-box flex column">
            <label for="book-additional-info"
              >Is there something else you wish to let us know?</label
            >
            <input
              type="text"
              name="book-additional-info"
              id="book-additional-info"
            />
          </div>
        </div>
        <ButtonElement
          text="Book a Table!"
          @click="modalStore.openModal('showBooking')"
        />
      </div>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
    <!-- <h1>The Best Pizzeria!</h1>
    <h2>Come and eat at our place! Lorem ipsum, dolor sit amet consectetur adipisicing elit!</h2>
    <div class="btn-container">
      <ButtonElement text="Book a Table!" @click="modalStore.openModal('showBooking')" />
      <NuxtLink to="menu">
        <ButtonElement text="Order Pizza" />
      </NuxtLink>
    </div> -->
  </div>
</template>

<script>
import { useModalStore } from "../stores/modalStore";

export default {
  name: "MainTextElement",
  props: {
    title: {
      type: String,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
  // methods: {
  //   test() {
  //     console.log("titleelement");
  //   },
  // },
};
</script>

<style scoped>
/* .container > * {
  border: 1px solid white;
} */
.container {
  width: calc(100vw - 30px);
  /* min-width: 400px; */
  max-width: 800px;
  height: fit-content;
  margin: 150px 15px 15px;

  padding: 1rem;
  text-align: center;
  color: var(--main-white);

  /* font-size: 28px;
  letter-spacing: 8px;
  text-transform: uppercase; */
  background-color: var(--main-black-opaque);
  /* opacity: 0.8; */
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* transform: translateZ(5px) scale(0.8); */
}
h1 {
  margin-top: 20px;
  transform: rotateZ(353deg);
  font-size: 4rem;
}
.order > p {
  margin: 10px 0;
}
.menu-btn {
  margin: 20px 0;
  text-decoration: none;
  color: unset;
}

.booking-box {
  margin-top: 10px;
  border: 1px solid var(--main-white);
  border-radius: 20px;
  width: 100%;
  height: fit-content;
  padding: 1rem;
  flex-direction: column;
}
.input-container {
  border: 1px solid var(--main-white);
  border-radius: 20px;
  padding: 0.5rem 1rem 0 1rem;
  align-items: center;
}
.input-box > input,
/* .input-box > :first-child > * > input */
.input-box {
  width: fit-content;
  margin-bottom: 1rem;
  font-family: inherit;
  font-size: 100%;
}
.booking-date-box {
  flex-direction: column;
}

.booking > :last-child {
  margin: 10px;
  text-align: end;
  font-size: 80%;
}

.border {
  background-color: #111;
  color: #fff;
  padding: 20px;
}
.transparent {
  background-color: transparent;
}
.container > * {
  margin: 30px 10px;
}
/* .btn-container {
  display: flex;
  justify-content: space-evenly;
} */
@media screen and (min-width: 400px) {
  .booking-date-box {
    flex-direction: row;
  }
}
@media screen and (min-width: 600px) {
  .container {
    text-align: left;
  }
  .input-container {
    align-items: flex-start;
  }
  .booking-box {
    flex-direction: row;
  }
}
</style>

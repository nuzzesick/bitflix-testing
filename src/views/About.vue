<template>
  <div class="about">
    <div class="background-movie"></div>
      <div class="top">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <GoBack />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
</template>
<script>
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
  name: "movieDetails",
  components: {
    GoBack,
    Footer
  },
  data() {
    return {}
  },
  mounted() {
    let bg = document.createElement("script");
    bg.setAttribute("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js");
    document.body.appendChild(bg);
    let bg1 = document.createElement("script");
    bg1.setAttribute("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js");
    document.body.appendChild(bg1);
    let bg2 = document.createElement("script");
    bg2.setAttribute("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js");
    document.body.appendChild(bg2);
  },
}
</script>

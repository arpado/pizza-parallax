<template>
  <div class="icon-wrapper flex justify-evenly align-center">
        <!-- <Icon name="mdi:fireplace" size="150px"/> -->
        <div class="icon-container">
            <Icon name="game-icons:full-pizza" class="progress-icon"/>
            <Icon name="material-symbols:check-circle-rounded" size="50px" class="check-mark"/>
        </div>
        <div class="arrow-container">
            <Icon name="material-symbols:arrow-forward-ios" class="progress-icon"/>
        </div>
         <div class="icon-container">
            <Icon name="mdi:fireplace" class="progress-icon" />
            <Icon name="material-symbols:check-circle-rounded" size="50px" class="check-mark"/>
        </div>
        <div class="arrow-container">
            <Icon name="material-symbols:arrow-forward-ios" class="progress-icon"/>
        </div>
        <div class="icon-container">
            <Icon name="mdi:truck-fast" class="progress-icon" />
            <!-- <Icon name="material-symbols:check-circle-rounded" size="50px" class="check-mark"/> -->
            <Icon name="mdi:clock-time-eight" size="50px" class="check-mark"/>
        </div>
        
        
        
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.icon-wrapper {

}
.icon-container {
    position: relative;
    width: 150px;
}
.arrow-container {
    width: 50px;
    height: 100px;
}
.progress-icon {
    width: 100%;
    height: 100%;
}
.check-mark {
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>
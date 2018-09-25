<template>
	<v-container fluid>
		<v-slide-y-transition mode="out-in">
			<v-layout column align-center>
				<img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
				<a href="http://localhost:8000/music?id=test.flac" target="_blank"> <button class="btn btn-success"> Download </button></a>
				{{ meta ? meta.artist : "?" }}: {{ meta ? meta.title : "?" }}
				<audio src="http://localhost:8000/music?id=test.flac&type=stream" controls>
					<a href="http://localhost:8000/music?id=test.flac">Download song</a>
				</audio>
				<blockquote>
					&#8220;First, solve the problem. Then, write the code.&#8221;
					<footer>
						<small>
							<em>&mdash;John Johnson</em>
						</small>
					</footer>
				</blockquote>
			</v-layout>
		</v-slide-y-transition>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				meta: null,
				format: null
			};
		},

		created () {
			fetch("http://localhost:8000/music?id=test.flac&type=meta").then(response => {
				console.log(response);
				return response.json();
			}).then(meta => {
				this.meta = meta.common;
				this.format = meta.format;
				console.log(meta);
			}).catch(err => {
				console.error(err);
			});
		}
	};
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>

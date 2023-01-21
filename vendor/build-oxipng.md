# Building [**oxipng**](https://github.com/shssoichiro/oxipng) (on Linux)

## Install dependencies
```sh
sudo apt update -y
sudo apt install -y gcc-multilib g++-multilib mingw-w64
```

## Install Rust & Cargo using Rustup
```sh
curl https://sh.rustup.rs -sSf | sh
```

## Clone oxipng source
```sh
git clone https://github.com/shssoichiro/oxipng.git
cd oxipng
```

## Build for Linux
> Target triples:<br>
> `x86_64-unknown-linux-gnu` / `i686-unknown-linux-gnu`

### 64-bit
```sh
rustup target install x86_64-unknown-linux-gnu
cargo build --release --target=x86_64-unknown-linux-gnu
```

### 32-bit
```sh
rustup target install i686-unknown-linux-gnu
cargo build --release --target=i686-unknown-linux-gnu
```

## Build for Windows
> Target triples:<br>
> `x86_64-pc-windows-gnu` / `i686-pc-windows-gnu`<br>
> or<br>
> `x86_64-pc-windows-msvc` / `i686-pc-windows-msvc`

### 64-bit
```sh
rustup target add x86_64-pc-windows-gnu
cargo build --release --target x86_64-pc-windows-gnu
```

### 32-bit
```sh
rustup target add i686-pc-windows-gnu
cargo build --release --target i686-pc-windows-gnu
```

## Build for macOS
> Target triple:<br>
> `x86_64-apple-darwin`

### 64-bit _(following [**this howto**](https://godot-rust.github.io/book/gdnative/export/macosx.html#howto)_)
1. Install dependencies
```sh
	# make sure you have a proper C/C++ native compiler first, as a suggestion:
	sudo apt install -y clang libclang-dev llvm-dev make libssl-dev lzma-dev libxml2-dev uuid-dev bash patch tar xz-utils bzip2 gzip sed cpio libbz2-dev libz-dev zlib1g-dev
```
2. Prepare **osxcross** cross-compiler for building for macOS on Linux
```sh
	# change the following path to match your setup
	export MACOSX_CROSS_COMPILER=$HOME/macosx-cross-compiler

	install -d $MACOSX_CROSS_COMPILER/osxcross
	install -d $MACOSX_CROSS_COMPILER/cross-compiler
	cd $MACOSX_CROSS_COMPILER
	git clone https://github.com/tpoechtrager/osxcross.git && cd osxcross
```
3. [Download **Command Line Tools for Xcode** _or_ **Xcode**](https://developer.apple.com/download/all/?q=xcode)
4. [Package SDK](https://github.com/tpoechtrager/osxcross#packaging-the-sdk)
```sh
	# When using Command Line Tools for Xcode:
	./tools/gen_sdk_package_tools_dmg.sh <command_line_tools_for_xcode>.dmg

	# Or when using Xcode:
	# ./tools/gen_sdk_package_pbzx.sh <xcode>.xip
```
5. Copy/move packaged SDKs to `osxcross/tarballs/` folder
6. Build and install **osxcross** (MacOSX SDK v12.3, supporting darwin21.4)
```sh
	UNATTENDED=yes SDK_VERSION=12.3 TARGET_DIR=$MACOSX_CROSS_COMPILER/cross-compiler ./build.sh
```
7. Set to use the cross-compiler for targets in `cargo build`
```sh
	echo "[target.x86_64-apple-darwin]" >> $HOME/.cargo/config
	find $MACOSX_CROSS_COMPILER -name x86_64-apple-darwin21.4-cc -printf 'linker = "%p"\n' >> $HOME/.cargo/config
	echo >> $HOME/.cargo/config
	export PATH="$MACOSX_CROSS_COMPILER/cross-compiler/bin:$PATH"
```
8. (optional) Make and install cctools/ld64
```sh
	# Install cctools/ld64
	# https://github.com/tpoechtrager/cctools-port#install-cctools-and-ld64

	git clone https://github.com/tpoechtrager/cctools-port.git
	cd cctools-port/cctools
	./configure --target=x86_64-apple-darwin
	make
	sudo make install

	# Check path:
	# echo $PATH

	# (optional) Add (one of) these:
	# export PATH="/home/username/macosx-cross-compiler/cctools-port/cctools:$PATH"
```
9. Build inside **oxipng** folder:
```sh
	rustup target add x86_64-apple-darwin
	CC=$MACOSX_CROSS_COMPILER/cross-compiler/bin/x86_64-apple-darwin21.4-cc C_INCLUDE_PATH=$MACOSX_CROSS_COMPILER/cross-compiler/SDK/MacOSX12.3.sdk/usr/include cargo build --release --target x86_64-apple-darwin
```

## Build for Linux / macOS on ARM64
```sh
rustup target add aarch64-unknown-linux-gnu
cargo build --release --target aarch64-unknown-linux-gnu

rustup target add aarch64-apple-darwin
cargo build --release --target aarch64-apple-darwin
```

## Copy binaries
```sh
cp target/x86_64-unknown-linux-gnu/release/oxipng /dest/folder/linux/x64/
cp target/i686-unknown-linux-gnu/release/oxipng /dest/folder/linux/x86/
cp target/x86_64-pc-windows-gnu/release/oxipng.exe /dest/folder/win/x64/
cp target/i686-pc-windows-gnu/release/oxipng.exe /dest/folder/win/x86/
cp target/x86_64-apple-darwin/release/oxipng /dest/folder/macos/x64/
```

## See also
* https://doc.rust-lang.org/cargo/reference/config.html#target
* https://doc.rust-lang.org/nightly/rustc/platform-support.html
* https://github.com/cross-rs/cross
* https://github.com/multiarch/crossbuild


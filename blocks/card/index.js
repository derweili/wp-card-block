/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { MediaPlaceholder, BlockControls, RichText, URLInput } = wp.editor;
const { IconButton, Toolbar, TextControl } = wp.components;

/**
 * Register Block
 */
registerBlockType('horttcore/card', {
	title: 'Card',
	icon: 'slides',
	category: 'common',
	keywords: [__('Card', 'wp-card-block')],
	attributes: {
		imgSrc: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img'
		},
		imgId: {
			type: 'number'
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img'
		},
		headline: {
			type: 'string',
			source: 'text',
			selector: '.card__title',
		},
		body: {
			type: 'array',
			source: 'children',
			selector: '.card__body'
		},
		buttonText: {
			type: 'string',
			selector: '.card__button'
		},
		buttonLink: {
			type: 'string',
            source: 'attribute',
            attribute: 'href',
            selector: '.card__button',
		}
	},
	edit: props => {
		const {
			attributes: { headline, imgSrc, imgId, imgAlt, body, buttonText, buttonLink },
			className,
			setAttributes,
			isSelected
		} = props;
		const onSelectImg = img => {
			if (!img || !img.url) {
				setAttributes({ imgSrc: null, imgId: null, imgAlt: null });
				return;
			}
			setAttributes({ imgSrc: img.url, imgId: img.id, imgAlt: img.alt });
		};
		const classes = 'component-card ' + className;
		return (
			<section className={classes}>
				<figure className="card__image">
					{!imgId ? (
						<MediaPlaceholder
							icon="format-image"
							labels={ {
								title: __( 'Image', 'wp-card-block' ),
								headline: __( 'Image', 'wp-card-block' ),
							} }
							onSelect={onSelectImg}
							accept="image/*"
							type="image"
						/>
					) : (
						<Fragment>
							<img src={imgSrc} alt={imgAlt} />
							{isSelected ? (
								<IconButton
									className="remove-image"
									label={ __( 'Remove image', 'wp-card-block' ) }
									onClick={() =>
										setAttributes({
											imgSrc: null,
											imgId: null,
											imgAlt: null
										})
									}
									icon="no-alt"
								/>
							) : (
								''
							)}
						</Fragment>
					)}
				</figure>
				<header className="card__header">
					<h1 className="card__title">
						<RichText
							value={headline}
							placeholder={ __( 'Lorem ipsum…', 'wp-card-block' ) }
							keepPlaceholderOnFocus
							onChange={headline => setAttributes({ headline })}
						/>
					</h1>
				</header>
				<div className="card__body">
					<RichText
						tagName="div"
						value={body}
						multiline="p"
						placeholder={ __( '…dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.', 'wp-card-block' ) }
						keepPlaceholderOnFocus
						onChange={body => setAttributes({ body })}
					/>
				</div>
				<footer className="card__footer">
					<RichText
						tagName="span"
						className="button"
						label={ __( 'Button Text', 'wp-card-block' ) }
						value={ buttonText }
						placeholder={ __( 'Button Text', 'wp-card-block' ) }
						keepPlaceholderOnFocus
						onChange={ buttonText => setAttributes( { buttonText } ) }
					/>
					{ isSelected && (
						<Fragment>
                            <form
                                className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
                                onSubmit={ event => event.preventDefault() }
                            >
                                <URLInput
                                    className="url"
                                    value={ buttonLink }
                                    onChange={ buttonLink => setAttributes( { buttonLink } ) }
                                />
                                <IconButton
                                    icon="editor-break"
                                    label={ __( 'Save', 'wp-card-block' ) }
                                    type="submit"
                                />
                            </form>
                        </Fragment>
	                ) }
				</footer>
			</section>
		);
	},
	save: props => {
		const {
			className,
			imgSrc,
			imgAlt,
			body,
			headline,
			buttonText,
			buttonLink
		} = props.attributes;
		const hasButtonText = ( buttonText.length > 0 ) ? true : false;

		return (
			<section className={className}>
				<figure className="card__image">
					<img src={imgSrc} alt={imgAlt} />
				</figure>
				<header class="card__header">
					<h1 class="card__title">{ headline }</h1>
				</header>
				<div class="card__body">
					{ body }
				</div>
                <footer className="card__footer">
					<a className="card__button" href={ buttonLink }>{ buttonText }</a>
				</footer>
			</section>
		);
	}
});

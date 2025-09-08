// src/domain/entities/user.entity.ts

export class Cliente {
  constructor(
    public readonly id: number,
    public readonly nombres: string | null,
    public readonly apellidoPaterno: string | null,
    public readonly apellidoMaterno: string | null,
    public readonly direccion: string | null,
    public readonly estado: string | null,
    public readonly nroDocumento: string | null,
    public readonly tipoDocumentoId: number | null,
    public readonly tipoCliente: string | null,
    public readonly razonSocial: string | null,
    public readonly nombreComercial: string | null,
    public readonly profesion: string | null,
    public readonly ocupacionId: number | null,
    public readonly tipoClienteId: number | null,
    public readonly grupoEconomicoId: number | null,
    public readonly ubigeoCodDist: string | null,
    public readonly grupoId: number | null,
    public readonly fechaRegistro: Date | null,
    public readonly interconexion: string | null,
    public readonly personaId: number | null,
    public readonly esPromotor: string | null,
    public readonly esProspecto: string | null
  ){}
}